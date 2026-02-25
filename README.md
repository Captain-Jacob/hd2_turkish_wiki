HELldivers 2 TÜRKÇE WIKI
============================================================

Helldivers 2 için hazırlanmış basit, hızlı ve genişletilebilir bir Türkçe wiki projesidir.

Silahlar, düşmanlar, stratagemler ve build önerileri Markdown (.md) dosyalarından otomatik olarak okunur.
Yeni içerik eklemek için kod yazmaya gerek yoktur.

Geçici Canlı Link:
https://hd2-turkish-wiki.vercel.app/

============================================================
ÖZELLİKLER
============================================================

- Markdown tabanlı içerik sistemi
- Next.js + Node.js altyapısı
- Otomatik yenilenme 
- Kategori bazlı içerik yapısı
- Kolay katkı sistemi

============================================================
GEREKSİNİMLER
============================================================

Projeyi çalıştırabilmek için bilgisayarında şunlar kurulu olmalıdır:

- Node.js (Önerilen: LTS sürüm)
- npm (Node.js ile birlikte gelir)

Kurulu olup olmadığını kontrol etmek için terminale şunları yaz:

node -v
npm -v

============================================================
KURULUM VE ÇALIŞTIRMA
============================================================

1) Projeyi indir veya klonla
2) Proje klasörünün içine gir
3) Terminalde aşağıdaki komutları çalıştır:

npm install
npm run dev

Ardından tarayıcıdan şu adrese git:

http://localhost:3000

Dosyalarda değişiklik yaptıkça site otomatik olarak yenilenir.

============================================================
PROJE YAPISI
============================================================

Tüm içerikler content/ klasöründen okunur.

Örnek klasör yapısı:

content/
  weapons/
    ar-23-liberator.md
    ar-23p-liberator-penetrator.md
  enemies/
    charger.md
    bile-titan.md
  stratagems/
    orbital-laser.md
  builds/
    solo-bug-hunter.md

Her klasör bir kategoriye karşılık gelir.
Her .md dosyası bir sayfaya karşılık gelir.

============================================================
İÇERİK EKLEME
============================================================

Yeni bir silah eklemek için:

1) content/weapons/ klasörüne gir
2) Yeni bir .md dosyası oluştur

Örnek:

content/weapons/yeni-silah.md

Dosyayı kaydettiğinde otomatik olarak şu adreste görünür:

/weapons/yeni-silah

Aynı mantık enemies, stratagems ve builds için de geçerlidir.

============================================================
MARKDOWN DOSYA YAPISI
============================================================

Dosya adı URL olur.
Dosya içeriği sayfa içeriği olur.

Örnek içerik:

# AR-23 Liberator

Standart piyade silahı.

## Artılar
- Dengeli hasar
- Kolay kontrol

## Eksiler
- Zırhlılara karşı zayıf

============================================================
ÖRNEK İÇERİK ŞABLONU
============================================================

Örnek olması için aşağıdaki şablonu kopyalayıp, değiştirip yeni içerik oluşturabilirsin:

---
title: "AR-23C Liberator Concussive"
summary: "Concussive mühimmat kullanan assault rifle. Hasarı düşüktür ancak düşmanları sendeletme (stagger) konusunda etkilidir."
tags:
  - Assault Rifle
  - Primary
  - Light Penetration
  - Concussive

stats:
  damage: 75
  fire_rate: 400
  recoil: 28
  ergo: 65
  capacity: 60
  penetration: Light
---

<img
  src="https://helldivers.wiki.gg/images/AR-23C_Liberator_Concussive_Primary_Render.png"
  alt="AR-23C Liberator Concussive"
  width="420"
/>

## Genel Bilgi
AR-23C Liberator Concussive, standart **Liberator** platformunun concussive mühimmat kullanan varyantıdır.  
Hasarı azaltılmıştır ancak **düşmanları sendeletme (stagger)** etkisi sayesinde alan kontrolü sağlar.

---

## Procurement
Bu silah, **Steeled Veterans Premium Warbond** içinde açılır.

- **Kaynak:** Steeled Veterans (P1)
- **Bedel:** 20 Medal

---

## Detaylı Silah İstatistikleri
- **Hasar:** 75 (Ballistic)
- **Atış Hızı:** 400 RPM
- **Şarjör Kapasitesi:** 60
- **Yedek Şarjör:** 6
- **Recoil:** Yüksek
- **Penetration:** Light
- **Etkili Menzil:** Orta

---

## Artılar
- Düşmanları sendeletme (stagger) etkisi çok güçlü
- Kalabalık kontrolünde etkili
- Yüksek şarjör kapasitesi

---

## Eksiler
- Standart Liberator’a göre daha düşük DPS
- Light penetration nedeniyle zırhlı hedeflerde zayıf
- Fire rate düşük olduğu için yakın mesafede affetmez

---

## Kullanım Önerisi
- Terminid sürülerini kontrol altında tutmak için ideal
- Takımda **crowd control** rolü üstlenebilir
- Zırhlı hedefler için stratagem veya takım desteği gerekir

---

============================================================
KATKI REHBERİ (CONTRIBUTING)
============================================================

Projeye katkı yapmak için:

1) Repoyu forkla
2) Yeni bir branch oluştur
3) Değişiklikleri yap
4) Pull Request gönder

Eğer:

- Bir bug görürsen
- İçerik yanlışsa
- Yeni özellik önerin varsa

Issue açmaktan çekinme.

Katkılar memnuniyetle kabul edilir.

============================================================
YOL HARİTASI (PLANLANAN ÖZELLİKLER)
============================================================

- Silah karşılaştırma sistemi
- Görsel destekli içerikler
- Arama sistemi
- İstatistik tabloları

============================================================
NOTLAR
============================================================

- Proje aktif geliştirme aşamasındadır.
- İçerikler zamanla genişletilecektir.
- Amaç: Türk oyuncular için hızlı ve anlaşılır bir Helldivers 2 kaynağı oluşturmak.

============================================================
İLETİŞİM
============================================================

Bug, öneri veya katkı için GitHub üzerinden Issue veya Pull Request gönderebilirsiniz.

============================================================
