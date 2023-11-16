# Belajar Javascript

```
npm i express ejs mongoose method-override
```

Untuk persiapan.

```
show dbs
```

Check database apa saja yang ada, yang digunakan disini yang **shop_db**.

```
seeds.js
```
file mirip untuk blueprint, dan bisa men-generate data sesuai model yang digunakan.

Jika sudah membuat data di dalam seeds berarti itu sudah ter-generate, lalu masukan data array nya ke dalam model nya.

Lalu test dengan **node seeds.js** untuk lihat hasil nya.

```
db.products.deleteMany({})
```

* Testing habis ganti tipe data
* Habis itu jalanin lagi " **node seeds.js** " untuk memperbarui data.

di bagian edit.ejs, harus tambahkan method Override.