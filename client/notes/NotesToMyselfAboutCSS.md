# Şimdi main { flex: 1; } ne yapıyor?

`flex: 1` aslında kısa bir yazımdır, şu anlama gelir:

```
flex: 1 1 0;
```

**Bunlar sırasıyla:**

- **_flex-grow: 1_** → “Boş yer varsa, o yerden ben de pay alayım.”

- **_flex-shrink: 1_** → “Alan daralırsa, ben de küçülebilirim.”

- **_flex-basis: 0_** → “Başlangıçta genişliğim (veya yükseklik, column olduğu için) sıfırdan başlasın.”
