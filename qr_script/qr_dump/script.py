import pyqrcode
import png
from pyqrcode import QRCode
import shutil 
try:
    link = "text"
    url = pyqrcode.create(link)
    url.png("qr.png", scale = 8)

except:
    print("error")

    ##Directory ayarlarini falan yapmadim lmao sadece olusturuyo simdilik