//console.log("bağlantı")

//inputlar
// ekle butonu
//listeleyen eleman

const harcamaInput = document.querySelector("#harcama");
//console.log(harcamaInput)
const fiyatInput = document.querySelector("#fiyat");
//console.log(fiyatInput)
const formBtn = document.querySelector(".ekle-btn");
//console.log(formBtn)
const list = document.querySelector(".list");
//console.log(list)
const totalInfo = document.querySelector("#total-info");
//console.log(totalInfo)
const nameInput =document.getElementById('name-input')
//console.log(nameInput)
const userName=localStorage.getItem('name')

const statusCheck=document.getElementById('status-input')
//console.log(statusCheck)

const selectFilter=document.getElementById('filter-select')
//console.log(selectFilter)

nameInput.value=userName

nameInput.addEventListener('change',(e)=>{
    //console.log(e.target.value)
    localStorage.setItem('name', e.target.value)

})


//! FORM BUTONUNA TIKLAMA OLAYINI YAKALAMAK İÇİN OLAY İZLEYİCİSİ EKLEDİK.
formBtn.addEventListener("click", addExpense);
//console.log(harcamaInput)

//! HARCAMA KARTLARININ BULUNDUĞU LİSTEYE TIKLANILAN ELEMAN TESPİTİ İÇİN TIKLAMA OLAYI EKLEDİK.
list.addEventListener("click", handleClick);
//! SELECTBOX HER DEĞİŞTİĞİNDE DİNLEMEK İÇİN
selectFilter.addEventListener('change', handleFilter)
console.log(selectFilter)
//! TOPLAM BİLGİSİNİ TUTMAK İÇİN BİR DEĞİŞKEN TANIMLADIK
let toplam = 0;

//! HER EKLENEN ÜRÜNLE BİRLİKTE TOPLAM FİYATIN GÜNCELLENMESİ TOPLAMA FONKSİYONU
function updateToplam(fiyatBilgisi) {
  //!DIŞARIDAN PARAMETRE OLARAK FİYAT BİLGİSİ ALINIYOR
  //console.log(fiyatBilgisi)

  //! İNPUTTAN GELEN VERİ STRİNG OLDUĞU İÇİN NUMBER TÜRÜNE ÇEVRİLDİ
  toplam += Number(fiyatBilgisi);

  //!ELDE EDİLEN TOPLAM RAKAM HTML TARAFINA GÖNDERİLİYOR
  totalInfo.innerText = toplam;
}

//! YENİ ÜRÜN EKLEME FONKSİYONU
function addExpense(e) {
  //! FORMUN KENDİNDEN GELEN SAYFA YENİLEME ÖZELLİĞİNİ DEVRE DIŞI BIRAKMA
  e.preventDefault();
  // console.log(addExpense)
  //console.log(harcamaInput.value)

  //! VALIDATION İŞLEMİ (DOĞRULAMA) İNPUTLARDAN HERHANGİ BİRİ BOŞSA ALERT VER
  if (!harcamaInput.value || !fiyatInput.value) {
    alert("Tüm boş alanları doldurun!..");
    return;
  }

  //! EĞER İNPUTLAR DOLU İSE DEVAM ET

  //! EKLE BUTONUNA BASILDIĞI ANDA DİV OLUŞTURULUR
  const harcamaDiv = document.createElement("div");

  //! OLUŞTURULAN DİV'E EXPENSE CLASS'I ATANIYOR
  harcamaDiv.classList.add("expense");

  //! Eğer ödendi checkboxı işaretlenmişse bu koşula gir
  if(statusCheck.checked){
    //console.log(statusCheck.checked)
  
  //! Kartın classlarına payed clasını ekle 
    harcamaDiv.classList.add('payed')

  }

  //console.log(statusCheck.checked)

  //! OLUŞTURULAN DİV'İN İÇERİĞİNE, İLGİLİ HTML ELEMANLARI VERİLİYOR

  //! TEK TIRNAK İLE SADECE TEK TIRNAK YAZABİLİYORUZ VE İÇERİSİNE DİNAMİK VERİ EKLEYEMİYORUZ
  //! BU YÜZDEN BACTICK (``) KULLANDIK.
  harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id='value'>${fiyatInput.value}</h2>
        <div class="buttons">
            <img id='payment' src="/pay.png" alt="">
            <img id='remove' src="/remove.png" alt="">
        </div>`;

  //! OLUŞTURULAN HARCAMA DİVİ HTML TARAFINA GÖNDERİLİYOR
  list.appendChild(harcamaDiv);
  //console.log(harcamaDiv);

  //! TÜM İŞLEMLER TAMAMLANDIKTAN SONRA FİYAT GÜNCELLENİYOR
  updateToplam(fiyatInput.value);

  //! INPUT İÇERİĞİNİ İŞLEM BİTTİKTEN SONRA TEMİZLEME
  harcamaInput.value = "";
  fiyatInput.value = "";
}


//! SİLME İŞLEMİ İÇİN ELEMANI TESPİT ETME
function handleClick(e) {
  // console.log(e.target)


//! TIKLANILAN ELEMAN GENEL E PARAMETRESİNİN TARGET ÖZELLİĞİNDEDİR.  
//! TIKLANILAN ELEMANI DEĞİŞKENE ATIYORUZ
  let tiklanilanEleman = e.target;


//! TIKLANILAN ELEMANIN SİLME RESMİ OLDUĞUNU TESPİT EDİYORUZ
  if (tiklanilanEleman.id === "remove") {
    // console.log(tiklanilanEleman.parentElement.parentElement)


//! BİR ELEMANIN BİR ÜST KAPSAYICI YAPISIN ALMAK İÇİN PARENT ELEMENT KULLANILIR

//! İLK PARENT = BUTTONS DİVİNE ULAŞTIK , İKİNCİ PARENT HARCAMA DİVİNE ULAŞTIK

    const kapsayiciElement = tiklanilanEleman.parentElement.parentElement;
    // console.log(kapsayiciElement)

//! DİV İÇERİSİNDE FİYAT BİLGİSİNE VERDİĞİMİZ İD ÖZELLİĞİ İLE ULAŞIYORUZ
    const deletedPrice=kapsayiciElement.querySelector('#value').innerText
   // console.log(deletedPrice)

//! ULAŞTIĞIMIZ VERİ STRING OLDUĞU İÇİN ÖNCE NUMBER A ÇEVİRİYORUZ 
//! DAHA SONRA BAŞINA EKSİ KOYUYORUZ VE TOPLAMA FONKSİYONUNDAN ÇIKMASINI SAĞLIYORUZ
    updateToplam(-Number(deletedPrice))

//! İSTENİLEN BİR ELEMANI HTML DEN KALDIRMA
    kapsayiciElement.remove();
  }
}


//! SELECTBOX HER DEĞİŞTİĞİNDE ÇALIŞACAK FONKSİYON
function handleFilter(e){
  //console.log("filtre-fonksiyonu")
  const harcamaKartlari=list.childNodes
  const filterValue = e.target.value
  //console.log(filterValue)
  //console.log(harcamaKartlari)


//! HARCAMA KARTLARINI HEPSİNİ forEach ile dön
  harcamaKartlari.forEach((harcamaKarti)=>{
    console.log(harcamaKarti)


    switch(filterValue){

      case 'all':
        harcamaKarti.style.display='flex'
        break;

      
      case 'payed':

      if(!harcamaKarti.classList.contains('payed')){
          harcamaKarti.style.display='none'

      } else { 

        harcamaKarti.style.display='flex'
      }
      break;

      case "not-payed":
        if(harcamaKarti.classList.contains('payed')){
          harcamaKarti.style.display='none'
        } else {
          harcamaKarti.style.display='flex'
        }
        break;

    }




  })






}
