import numpy as np
from tqdm import tqdm
import os
import cv2
import tflearn 
from tflearn.layers.conv import conv_2d, max_pool_2d 
from tflearn.layers.core import input_data, dropout, fully_connected 
from tflearn.layers.estimator import regression 
import json
import tensorflow as tf
from sklearn.model_selection import train_test_split
import urllib

class prediction_model(object):
    pos=0 
    neg=0
    total=0
    EPOCH = 50
    result = []
    LABELS = ["Colgate-large", "Colgate-small", "Kitkat-large", "Kitkat-medium", "Kitkat-small", "Dettol-small", "extra1", "extra2"]
    IMG_SIZE = 50
    LR = 1e-3
    TRAIN_DIR = '/home/Shashi/Desktop/inframind/data/train_data'
    TEST_DIR = '/home/Shashi/Desktop/inframind/data/test_data'
    #MODEL_NAME = 'imageclassify-{}-{}.model'.format(LR, '6conv-basic')
    MODEL_NAME = "model.h5"
    convet = None
    record = []
    X = None        
    Y = None
    test_x = None
    train_data =None
    test_data = None 
    model = None
    val_x = None
    val_y = None
        
    '''Labelling the dataset'''
    def label_img(self,img):
        #print("data ",img.split('.')[0][:4])
        word_label = img.split('.')[0][:4] 
        # DIY One hot encoder
        if word_label   == 'coll': return [1, 0, 0, 0, 0, 0, 0, 0] 
        elif word_label == 'cols': return [0, 1, 0, 0, 0, 0, 0, 0]
        elif word_label == 'kikl': return [0, 0, 1, 0, 0, 0, 0, 0]
        elif word_label == 'kikm': return [0, 0, 0, 1, 0, 0, 0, 0]
        elif word_label == 'kits': return [0, 0, 0, 0, 1, 0, 0, 0]
        elif word_label == 'dets': return [0, 0, 0, 0, 0, 1, 0, 0]
        
    '''Creating the training data'''
    def create_train_data(self):
        # Creating an empty list where we should store the training data 
        # after a little preprocessing of the data 
        training_data = [] 
        
        # tqdm is only used for interactive loading 
        # loading the training data 
        for img in tqdm(os.listdir(self.TRAIN_DIR)):
            # labeling the images 
            label = self.label_img(img) 
            
            if(label==None):  
                print(img)
            path = os.path.join(self.TRAIN_DIR, img) 
                
            # loading the image from the path and then converting them into 
            # greyscale for easier covnet prob 
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE) 
            # resizing the image for processing them in the covnet 
            img = cv2.resize(img, (self.IMG_SIZE, self.IMG_SIZE)) 
            # final step-forming the training data list with numpy array of the images 
            #training_data.append([np.array(img), np.array(label)]) 
            training_data.append([np.array(img), np.array(label)]) 
            # saving our trained data for further uses if required 
            #np.save('train_data.npy', training_data) 
        return training_data 
    '''Processing the given test data'''  
    # Almost same as processing the training data but 
    # we dont have to label it. 
    def process_test_data(self): 
        testing_data = [] 
        for img in tqdm(os.listdir(self.TEST_DIR)): 
            path = os.path.join(self.TEST_DIR, img) 
            img_num = img.split('.')[0] 
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE) 
            img = cv2.resize(img, (self.IMG_SIZE, self.IMG_SIZE)) 
            testing_data.append([np.array(img/255), img_num]) 
            #np.save('test_data.npy', testing_data) 
            #print(testing_data)
            return testing_data
    '''Running the training and the testing in the dataset for our model'''
    def create_dataset(self):
        self.train_data = self.create_train_data() 
        # self.test_data = self.process_test_data() 
        # X-Features & Y-Labels 
        self.X = np.array([i[0] for i in self.train_data]).reshape(-1, self.IMG_SIZE, self.IMG_SIZE, 1) 
        self.Y = np.array([i[1] for i in self.train_data]).reshape(-1,8)
        
        self.X, self.val_x, self.Y, self.val_y = train_test_split(self.X, self.Y, test_size=0.4)
        
        
        #self.test_x = np.array([i[0] for i in self.test_data]).reshape(-1, self.IMG_SIZE, self.IMG_SIZE, 1) 
            
    #Creating the neural network using tensorflow
    # Importing the required libraries 
    def create_network(self):
        tf.reset_default_graph() 
        convnet = input_data(shape =[None, self.IMG_SIZE, self.IMG_SIZE, 1], name ='input') 
        
        convnet = conv_2d(convnet, 32, 5, activation ='relu') 
        convnet = max_pool_2d(convnet, 5) 
        
        convnet = conv_2d(convnet, 64, 5, activation ='relu') 
        convnet = max_pool_2d(convnet, 5) 
        
        convnet = conv_2d(convnet, 128, 5, activation ='relu') 
        convnet = max_pool_2d(convnet, 5) 
        
        convnet = conv_2d(convnet, 64, 5, activation ='relu') 
        convnet = max_pool_2d(convnet, 5)   
        
        convnet = conv_2d(convnet, 32, 5, activation ='relu') 
        convnet = max_pool_2d(convnet, 5) 
        convnet = fully_connected(convnet, 1024, activation ='relu') 
        
        convnet = dropout(convnet, 0.8) 
        convnet = fully_connected(convnet, 8, activation ='softmax') 
        
        self.convnet = regression(convnet, optimizer ='adam', learning_rate = self.LR, 
        loss ='categorical_crossentropy', name ='targets') 
        
        self.model = tflearn.DNN(self.convnet, tensorboard_dir ='log') 
        
        print(type(self.model))
    def train(self):
        self.model.fit(self.X, self.Y,   validation_set=(self.val_x,self.val_y),shuffle= bool)        
        self.model.save("prediction_model.tfl")
        
        
    def predict(self):
        self.model.load("prediction_model.tfl")
        num=1
        self.TEST_DIR="/var/www/html/billing/cgi-enabled/image"
        for img in tqdm(os.listdir(self.TEST_DIR)): 
            path = os.path.join(self.TEST_DIR, img) 
            res = []
            res.append(img)
            # loading the image from the path and then converting them into 
            # greyscale for easier covnet prob 
            img = cv2.imread(path, cv2.IMREAD_GRAYSCALE) 
            
            # resizing the image for processing them in the covnet 
            img = cv2.resize(img, (self.IMG_SIZE, self.IMG_SIZE)) 
            
            # final step-forming the training data list with numpy array of the images 
            #training_data.append([np.array(img), np.array(label)]) 
            pred_data = np.array(img)
            data = pred_data.reshape(self.IMG_SIZE, self.IMG_SIZE, 1) 
            #print("pred ",data.shape)\
            #model_out = model.predict([data])[0] 
            model_out = self.model.predict([data])[0]
            #print(model_out,"\nmodel \n",np.argmax(model_out))
            output = self.LABELS[np.argmax(model_out)]
            #print("output:",output,"\t:\t",path)
            res.append(np.argmax(model_out))
            res.append(self.LABELS[np.argmax(model_out)])
            #self.result.append(res)
            
            dic ={ }
            dic["name"]  = res[0]
            dic["label"] = res[2]
            #print("res\t",res,"self.result\t",self.result,"dic\t",dic)
            #f = open("predicted_result.txt", "w")
            #f.write(json.dumps(res))
            #f.close()
            #print(type(json.dumps(res)))
            self.result.append(dic)
        return self.result            
            
        '''   
        for res in self.result:
            self.total=self.total+1
            if res[2]== self.LABELS[np.argmax(np.array(self.label_img(res[0])))]:
                self.pos=self.pos+1
            else:
                self.neg= self.neg+1
                #print(res[0],"---->",res[2],"----->",LABELS[np.argmax(np.array(label_img(res[0])))])
                #print(total,"\t",pos,"\t",neg)
        temp = []
        temp.append(self.EPOCH)
        temp.append(self.total)
        temp.append(self.pos)
        temp.append(self.neg)
        self.record.append(temp)
        y = json.dumps(self.record)
        print(self.record)
        '''




  
  
  
