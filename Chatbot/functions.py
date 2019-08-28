#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import pyaudio
import wave
import audioop
import os
import io
import requests
import json
from collections import deque
from array import array
from google.cloud import translate
from google.cloud import texttospeech
from google.cloud.texttospeech import enums
from google.cloud import speech
from google.cloud.speech import types

conv_text="Shashi"
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/Shashi/My First Project-ff14ceed11f5.json"
#os.environ["https_proxy"] = "http://192.168.0.20:3128"

#Record audio from default input device
def record():
  # Microphone stream configuration.
  FORMAT=pyaudio.paInt16
  CHANNELS=1    #mono
  RATE=16000    #16000 is suitable for Google Speech API
  CHUNK=1024      
  RECORD_SECONDS=5
  FILE_NAME="RECORDING.wav"    # Filename for writing recorded stream

  audio=pyaudio.PyAudio()      #Creating a instance of PyAudio

  stream=audio.open(format=FORMAT,channels=CHANNELS,rate=RATE,input=True,frames_per_buffer=CHUNK) 

  frames=[]
  
  print("Started Recording!!!")
  for i in range(0,int(RATE/CHUNK*RECORD_SECONDS)):
    data=stream.read(CHUNK)
    data_chunk=array('h',data)
    vol=max(data_chunk)
    if(vol>=1200):
        print(vol)
        frames.append(data)
    else:
        print("Say Something")



  stream.stop_stream()
  stream.close()
  audio.terminate()

# Writing to File
  wavfile=wave.open(FILE_NAME,'wb')
  wavfile.setnchannels(CHANNELS)
  wavfile.setsampwidth(audio.get_sample_size(FORMAT))
  wavfile.setframerate(RATE)
  wavfile.writeframes(b''.join(frames))
  wavfile.close()



#converting from WAV format to lossless FLAC format using ffmpeg video converter

def convert():
    audio_fname="RECORDING.wav"
    exists = os.path.isfile("RECORDING.flac")
    if exists:
           os.remove("RECORDING.flac")
    os.system('ffmpeg -i RECORDING.wav RECORDING.flac')
   

def transcribe_streaming():
    client = speech.SpeechClient()
    stream_file="RECORDING.flac"
    #stream_file="marobo2.flac"
    with io.open(stream_file, 'rb') as audio_file:
        content = audio_file.read()

    stream = [content]
    requests = (types.StreamingRecognizeRequest(audio_content=chunk)
                for chunk in stream)

    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=16000,
        language_code='bn-IN',
        enable_automatic_punctuation=True)
    streaming_config = types.StreamingRecognitionConfig(config=config)


    responses = client.streaming_recognize(streaming_config, requests)

    transcript=u''
    for response in responses:
        for result in response.results:
            print('Finished: {}'.format(result.is_final))
            print('Stability: {}'.format(result.stability))
            alternatives = result.alternatives
            
            for alternative in alternatives:
                print('Confidence: {}'.format(alternative.confidence))
                print(u'Transcript: {}'.format(alternative.transcript))
                transcript=transcript + alternative.transcript
    
    return transcript;

def trans_btoe(text):
    
    #text=u"আমি শশী প্রকাশ শাহ"
    #text=u"হ্যালো"
    key='ENTER YOUR KEY HERE'
    url = 'https://translation.googleapis.com/language/translate/v2/?'
    '''
    print(type(url),url)
    print(type(text.encode("utf-8")),text.encode("utf-8"))
    print(type(key),key)
    print(type(text),text)
    url=url +'q=' + str(text.encode("utf-8")) + '&source=bn&target=en&key='+key
    print(type(url),url)
    print(type(text.encode("utf-8")),text.encode("utf-8"))
    print(type(key),key)
    print(type(text),text)
    '''
    url=url +'q=' + text + '&source=bn&target=en&key='+key
    r = requests.get(url)
    k=json.loads(r.text)
    #print(k["translations"[0].encode("utf8")])
    t=k['data']['translations'][0]['translatedText']
    print(t)
    conv_text=t
    f = open("convertedtext1.txt", "w")
   # print(type(translation['translatedText']))
    f.write(t)
    f.close()


def trans_etob(text,target):
    translate_client = translate.Client()
    translation = translate_client.translate(text,target_language=target)
    #print(u'Text: {}'.format(text))
    #print(u'Translation: {}'.format(translation['translatedText']))
    f = open("convertedtext.txt", "w")
    print(translation['translatedText'])
    f.write(translation['translatedText'])
    #f.write(translation['translatedText'].encode("utf-8"))
    f.close()

def construct_voice():
    client = texttospeech.TextToSpeechClient()
    #print("client created")
    f = open("convertedtext.txt", "r")
    txt=f.read()
    lang_code='en-IN'
    #print("read and set")
    synthesis_input = texttospeech.types.SynthesisInput(text=txt)
    voice = texttospeech.types.VoiceSelectionParams(
    language_code=lang_code,
    ssml_gender=texttospeech.enums.SsmlVoiceGender.NEUTRAL)
    audio_config = texttospeech.types.AudioConfig(
    audio_encoding=texttospeech.enums.AudioEncoding.MP3)
    #print("params set")
    response = client.synthesize_speech(synthesis_input, voice,audio_config)
   # print("Res received")
    with open('output.mp3', 'wb') as out:
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')
    exists = os.path.isfile("output.flac")
    if exists:
           os.remove("output.flac")
    os.system('ffmpeg -i output.mp3 output.flac')
    print("Playing audio!!!")
    cmd='play output.flac'
    os.system(cmd)

def speechtotxt():
    record()
    convert()
    transcript=transcribe_streaming()
    #print("getting transcript \n"+ transcript )
    trans_btoe(transcript)
    #print("finished")

def txttospeech(text):
    #u = text.decode("utf-8")
    u=text
    target='bn' 
    trans_etob(text,target)
    #print("trans completed")
    construct_voice()
    #print("finished")
   
    


