Helldivers 2 için hazırlanmış basit bir Türkçe wiki projesi.
Silahlar, düşmanlar, stratagemler ve build önerileri markdown (.md) dosyalarından otomatik olarak okunur.

Geçici canlı link:
https://hd2-turkish-wiki.vercel.app/

--------------------------------------------------

GEREKENLER
- Node.js 
- npm

--------------------------------------------------

PROJEYİ ÇALIŞTIRMA 

Projeyi klonladıktan sonra klasöre girip:

npm install
npm run dev

Komutları çalıştır.

Ardından tarayıcıdan şu adrese gir:
http://localhost:3000

Değişiklik yaptıkça site otomatik olarak yenilenir.

--------------------------------------------------

İÇERİK EKLEME

Tüm içerikler content/ klasöründen okunur.

Örnek yapı:
content/
  weapons/
    ar-23-liberator.md
  enemies/
    charger.md

Yeni bir silah eklemek için:
content/weapons/yeni-silah.md

Bu dosya otomatik olarak şu adreste görünür:
/weapons/yeni-silah

--------------------------------------------------
