import pyqrcode
import png
from pyqrcode import QRCode
import shutil 
import sqlite3
database = sqlite3.connect("qr_database.db")
cursor = database.cursor()



cursor.execute("CREATE TABLE IF NOT EXISTS kullanicilar('isim', 'soyisim','PNR','QR_id')")
isim = input("Kullanici ismini giriniz: ")
soyisim = input("Kullanici soyismini giriniz: ")
pnr  = input("Kullanici pnrini giriniz: ")
qr_id = "QR_"
cursor.execute("SELECT isim FROM kullanicilar")
veri = cursor.fetchall()
sayi = len(veri)
qr_id = qr_id + str(sayi)
try:
    link = "text"
    url = pyqrcode.create(link)
    url.png("{}.png".format(qr_id), scale = 8)
    #qr olustur
except:
    print("error")
komut = "INSERT INTO kullanicilar VALUES('{}','{}','{}','{}')".format(isim,soyisim,pnr,qr_id)
cursor.execute(komut)
database.commit()
#qrlari ekle 

