
# Plane Scape Application

Bu projede App Fellas'ın vermiş olduğu projeyi yapmış bulunmaktayım. Bu projede Flight V4 API' den gerekli bilgileri alıp anasayfada gösterme ve MongoDB'ye veri kaydedip çekmeyi yapmış bulunuyoruz.


## Projeyi çalıştırmak için yapılması gerekenler

### Gerekli paketleri yükleyin

```bash
  npm install
```

### MongoDB Bağlantısı
Eğer uçuşları veritabanına kaydediyorsanız, MongoDB'nin de çalışıyor olması gerekir. Eğer yerel bir MongoDB kullanıyorsanız, terminalde şu komutla MongoDB'yi başlatın:

```bash
  mongod
```

###  Node.js Sunucusunu Çalıştırmak
server.js dosyasını çalıştırarak API'nizi başlatmanız gerekiyor. Bunun için terminalde aşağıdaki komutu kullanın:

```bash
  node server.js
```

### React Uygulamasını Çalıştırmak
React uygulamanızın olduğu dizinde terminali açın ve şu komutu çalıştırın:

```bash
  npm start
```

  
## Server.js Komutları işlevleri




| Parametre | Açıklama                |
| :-------- | :------------------------- |
| `/allFlights` | Tüm uçuşların bilgisini getirir. JSON olarak dönüş yapar. |
| `/save-flight` | Alınan uçuşun idsini mongodb'ye kaydeder. |
| `/myFlights` | Alınan uçuların idsini mongodb'den alır ve gerekli bilgileri çeker. JSON formatında dönüş yapar |

  
## Ekran Görüntüleri

![Uygulama Ekran Görüntüsü](https://i.imgur.com/KW9Ni6t.png)

  