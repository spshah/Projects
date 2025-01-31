#!/usr/bin/env python
# -*- coding: utf-8 -*- 
import pyaudio
import wave
import audioop
import os
import io
from collections import deque
from array import array
from google.cloud import translate
from google.cloud import texttospeech
from google.cloud.texttospeech import enums

conv_text="Shashi"
def record():
  # Microphone stream config.

  FORMAT=pyaudio.paInt16
  CHANNELS=1
  RATE=16000
  CHUNK=1024
  RECORD_SECONDS=10
  FILE_NAME="RECORDING.wav"

  audio=pyaudio.PyAudio() 

  stream=audio.open(format=FORMAT,channels=CHANNELS,rate=RATE,input=True,frames_per_buffer=CHUNK)

  frames=[]
  
  print("Started Recording!!!")
  for i in range(0,int(RATE/CHUNK*RECORD_SECONDS)):
    data=stream.read(CHUNK)
    data_chunk=array('h',data)
    vol=max(data_chunk)
    if(vol>=700):
        #print("something said")
        frames.append(data)
    else:
        print("Say Something")



  stream.stop_stream()
  stream.close()
  audio.terminate()

  wavfile=wave.open(FILE_NAME,'wb')
  wavfile.setnchannels(CHANNELS)
  wavfile.setsampwidth(audio.get_sample_size(FORMAT))
  wavfile.setframerate(RATE)
  wavfile.writeframes(b''.join(frames))
  wavfile.close()





def convert():
    audio_fname="RECORDING.wav"
    exists = os.path.isfile("RECORDING.flac")
    if exists:
           os.remove("RECORDING.flac")
    #os.system('ffmpeg -i RECORDING.wav RECORDING.flac')
    os.system('ffmpeg -i RECORDING.wav-af "highpass=f=200, lowpass=f=3000" RECORDING.flac')
   

def transcribe_streaming():
    from google.cloud import speech
    from google.cloud.speech import enums
    from google.cloud.speech import types
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
        language_code='bn-IN')
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
    import requests
    import json
    #text=u"আমি শশী প্রকাশ শাহ"
    key='AIzaSyAaf9gX9gR_ub2tUeu8CJaqKP-Yhh-NXM8'
    url = 'https://translation.googleapis.com/language/translate/v2/?'
    url=url +'q=' +text.encode("utf-8") + '&source=bn&target=en&key='+key
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
    print(u'Text: {}'.format(text))
    print(u'Translation: {}'.format(translation['translatedText']))
    f = open("convertedtext.txt", "w")
   # print(type(translation['translatedText']))
    f.write(translation['translatedText'].encode("utf-8"))
    f.close()

def construct_voice():
    client = texttospeech.TextToSpeechClient()
    f = open("convertedtext.txt", "r")
    txt=f.read()
    print(txt,type(txt))
    synthesis_input = texttospeech.types.SynthesisInput(text=txt)
    voice = texttospeech.types.VoiceSelectionParams(
    language_code='en-IN',
    ssml_gender=texttospeech.enums.SsmlVoiceGender.NEUTRAL)
    audio_config = texttospeech.types.AudioConfig(
    audio_encoding=texttospeech.enums.AudioEncoding.MP3)
    response = client.synthesize_speech(synthesis_input, voice,audio_config)
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
    trans_btoe(transcript)
    print("finished")

def txttospeech(text):
    u = text.decode("utf-8")
    target='bn' 
    trans_etob(u,target)
    construct_voice()
    print("finished")
   
    
