const container=document.querySelector('.container');
const count=document.getElementById('count');
const amount=document.getElementById('amount');
const select=document.getElementById('movie');
const seats = document.querySelectorAll('.seat:not(.reserved)');

getFromLocalStorage(); // burda localStorage gelen kodlara kendi kodlarımıza uyguluyoruz.
calculateTotal();//Hesaplamar localStoragedan gelen bilgilerden sonra tekrar yapılıyor.



container.addEventListener('click' ,function(e){

    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){   
        e.target.classList.toggle('selected'); // toogle clası eger aranan eleman varsa siler yoksa ekler
        calculateTotal();

        
    }

});     

    //burda eger filmi değiştirirsek aşagıdaki içerdeki fonksiyon çalışır ve şecilen filme göre koltukların fiyatları belirlenir.
    select.addEventListener('change',function(e){
    calculateTotal();
    });

    // bu fonksiyon gerekli hesaplamaları yapar.
    function calculateTotal(){
        
        //secilen koltukları bulduk
        const selectedSeats=container.querySelectorAll('.seat.selected');
        
        const selectedSeatArr=[];
        const seatsArr=[];

        
            //Koltukların konumlarına dolaştık.
            selectedSeats.forEach(function(seat){
            selectedSeatArr.push(seat);
             });

            //Gelen koltukları bir dizinin içerisine aktardık
            seats.forEach(function(seat){
            seatsArr.push(seat);
            });


            // map metodu ile bütün elemanları doşlaştık ve elemanları seat içerisine kopyaladık
            //mat metodu bir anlamda bize secilen elemanların listesini verecek
            
            let selectedSeatIndexs = selectedSeatArr.map(function(seat){
            return seatsArr.indexOf(seat); //elemanlar içerisinde hangi liste elemanı hangi index nuamrasında ise bize bu index numarasını ilgili liste üzerinden getirecek.Gelen bilgiyide SelectedSeatIndexs içersine aktaracak
        });



        let selectedSeatCount = selectedSeats.length; //Seçili koltuların sayısını aldık
       
        let price=select.value; // fiyat bilgisi alındı
        count.innerText=selectedSeatCount;  //koltuk bilgisi güncellenir
        amount.innerText=selectedSeatCount*price; // fiyat bilgisi filme göre güncellenir.

        saveToLocalStorage(selectedSeatIndexs);


    }

    //buradan bilgileri tarayıcının bellegine yüklüyoruz.
    function saveToLocalStorage(indexs){
    
    localStorage.setItem('selectedSeats',JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex',select.selectedIndex);
    }

    //şeçilen bilgilerin localStorage alıp koda uygulama kısmı

    function getFromLocalStorage(){
        
        //localStorage gelen bilgileri uygun formata getirdik
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

        if(selectedSeats!=null && selectedSeats.length>0){
            seats.forEach(function(seat,index){

                if(selectedSeats.indexOf(index)>-1){
                    seat.classList.add('selected');
                }

            });
        }




        //localStoragedan hangi filmin secildiğini aldık
        const selectedMovieIndex=localStorage.getItem('selectedMovieIndex');

        //Gelen bilgilere göre uygulama üzerindeki gerekli bilgiler seçilir
        if(selectedMovieIndex!=null){
            select.selectedIndex=selectedMovieIndex;
        }


    }
