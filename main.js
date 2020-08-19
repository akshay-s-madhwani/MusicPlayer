window.onload = function () {

setTimeout(()=>{document.querySelector('#load').style.display = 'none';
   document.querySelector('.player_body').style.display = 'block';},5600);
   
    
    //Variables
    let audioArray = ["songs/Ed%20Sheeran%20-%20Perfect%20[Mw%20Hits].mp3",
                      
"songs/Imran%20Khan%20-%20Satisfya%20(Official%20Music%20Video)%20(1).mp3",
                      
"songs/Alan%20Walker,%20Ava%20Max%20-%20Alone,%20Pt.%20II.mp3",
                      
"songs/Diplo_-_Revolution_feat_Faustix_Imanos_and_Kai_Official_Music_Video%5BSaveFrom.online%5D.mp3", 
                      
"songs/Alessia%20Cara%20-%20How%20Far%20I'll%20Go%20(Official%20Video).mp3" ,
"songs/Benny%20Blanco%20Halsey%20&%20Khalid-Eastside.mp3","songs/Pal%20Pal%20Dil%20Ke%20Paas%20Title%20Arijit%20Singh%20Karan%20Deol,%20Sahher%20Parampara,%20Sachet,%20Rishi%20Rich.mp3", "songs/Loud%20Luxury%20Ft.%20Brando-Body.mp3", "songs/Imran%20Khan%20-%20Amplifier%20(Official%20Music%20Video).mp3"

    ];
    let imgArray = ["img/Ed-Sheeran-Divide Cover.jpg","img/satisfya.jpg", "img/external-content.duckduckgo.com.jpg", "img/kai.jpg", "img/Alessia%20cara.jpg","img/eastside.jpg", "img/Arijit.jpg","img/body.jpg", "img/amplifier.jpg"];

    let nameArray = ["Perfect", "Satisfya","Alone Pt.2","Revolution","How Far I'll Go", "Eastside","Pal pal dil ke pas", "Body", "Amplifier"];

    let artistArray = ["Ed Sheeran","Imran Khan", "Alan Walker ft.Ava Max", "Diplo ft. Kai & Faustix Imanos","Alessia Cara", "Benny Blanco, Halsey & Khalid","Arijit Singh", "Loud Luxury ft. Brando", "Imran Khan"];
    const showcase = document.querySelector('.display');
    const display = document.querySelector('.display_inner');
    const rollUp = document.querySelector('.fa-list');
    const left = document.querySelector('.fa-chevron-left');
    const right = document.querySelector('.fa-chevron-right');
    let button = document.querySelectorAll('.play')[0];
    let active = false;
    let songDisplay = document.querySelector('.currentSong');
    const timer = document.querySelector('.currentTime');
    let seekBar = document.querySelector('input[type=range]');
    let seek, stop;
    let listView = document.querySelector('.listView');


    //DOM creating object for upper display

    function createMusic(music, image, name, artist) {
        this.music = music;
        this.image = image;
        this.name = name;
        this.artist = artist;
    }
    createMusic.prototype.createPlayer = function () {
        const playerArray = [];
        for (i in this.music) {
            const player = document.createElement("AUDIO");
            player.className = "audio";
            player.setAttribute('src', this.music[i]);
            playerArray.push(player)
            display.appendChild(playerArray[i]);
        }
        return playerArray;
    }
    createMusic.prototype.createImg = function () {
        let imgArray = [];
        for (j in this.image) {
            let img = document.createElement("IMG");
            img.className = "play_img";
            img.setAttribute('src', this.image[j]);
            imgArray.push(img);
            display.appendChild(imgArray[j]);
        }

        return imgArray;
    }
    createMusic.prototype.Title = function () {
        let titleArray = [];
        for (j in this.name) {
            let title = document.createElement("P");
            title.className = "music_title";
            title.innerText = this.name[j];
            titleArray.push(title);
        }
        return titleArray;
    }

    createMusic.prototype.list = function () {
        let li, songName, artistName, breakLine, thumb;
        let lisArray = [];
        let listView = document.querySelector('.listView');
        let uList = document.createElement('UL');
        uList.className = 'uList';

        for (let i in this.artist) {
            li = document.createElement('LI');
            songName = document.createElement('P');
            artistName = document.createElement('P');
            breakLine = document.createElement('br');
            thumb = document.createElement('img');

            li.className = "list";
            songName.className = "title";
            artistName.className = "artist";
            thumb.className = "thumb";

            songName.innerText = this.name[i];
            artistName.innerText = this.artist[i];
            thumb.src = this.image[i];

            li.appendChild(songName);
            li.appendChild(artistName);
            li.appendChild(thumb);
            lisArray.push(li);
            uList.appendChild(li);
        }
        listView.appendChild(uList);
        return lisArray;
    }
    mainPlayer.prototype = Object.create(createMusic.prototype);

    mainPlayer.prototype.constructor = mainPlayer;

    Object.defineProperty(mainPlayer.prototype, 'constructor', {
        value: mainPlayer,
        enumerable: true,
        writable: true
    });

    //main MusicPlayer object

    function mainPlayer(music, image, name, artist) {
        createMusic.call(this, music, image, name, artist);
    }

    let stage = [];

    mainPlayer.prototype.imgPlaying = function (j) {

        stage.push(j)
        stage.length > 2 ? stage.splice(0, 1) : console.log(stage);

        console.log(active);
        console.log(stage);
        if (active == false) {
            active = true;
            this.music[j].play();
            button.setAttribute('class', ' fa fa-pause-circle-o play');
            songDisplay.innerHTML = `<p>${this.artist[j].childNodes[0].innerText}</p> <p> ${this.artist[j].childNodes[1].innerText}</p>`;
             
            return active;
        } else if (active == true) {
            this.music[stage[0]].currentTime = 0;
            this.music[stage[0]].pause();
            this.music[stage[1]].play();
            button.setAttribute('class', ' fa fa-pause-circle-o play');
            songDisplay.innerHTML = `<p>${this.artist[j].childNodes[0].innerText}</p> <p> ${this.artist[j].childNodes[1].innerText}</p>`;
            return active;
        }



    }
    mainPlayer.prototype.moveSong = function (j) {
    console.log(this.music[j].duration);
        return this.music[j];  
    }
    mainPlayer.prototype.utility = function (j) {
        console.log(active);
        if (active == false && stage.length == 0) {
            console.log(this.music[j]);
            active = true;
            this.music[0].play();
            button.setAttribute('class', ' fa fa-pause-circle-o play');
            this.music[0].onended = function () {
                console.log(this.music[j]);
            }
        } else if (active == true) {
            active = false;
            this.music[j].pause();
            button.setAttribute('class', ' fa fa-play-circle-o play');
        } else {
            active = true;
            this.music[j].play();
            button.setAttribute('class', ' fa fa-pause-circle-o play');
        }

    }
    mainPlayer.prototype.seekable = function (j) {
        let presentSong = this.music[j];
        if (active == true) {
            try {
                seekBar.max = presentSong.duration;
                presentSong.onchange = function () {
                    stopSeek()
                }
                seek = setInterval(function () {
                    seekBar.value = presentSong.currentTime;
                    date = new Date(presentSong.currentTime*1000);
                    let minute = date.getUTCMinutes();
                    let sec = date.getUTCSeconds();
                    timer.innerText = `${minute}:${sec}`;
                    let val = seekBar.value/seekBar.max;
                    let v = document.documentElement.style.setProperty('--seekPos',val);
                    seekBar.style.backgroundImage = -"webkit-gradient(linear,left top,right top,"+
                        "color-stop("+v+", yellow),"+"color-stop("+v+", black)"+")"; 

                    
                }, 1000);

                function stopSeek() {
                    console.log(presentSong)
                    clearInterval(seek);
                    seekBar.value = 0;
                }

                seekBar.onchange = function () {
                    presentSong.currentTime = seekBar.value;
                    seekBar.value = presentSong.currentTime;
                    let val = seekBar.value/seekBar.max;
                    let v = document.documentElement.style.setProperty('--seekPos',val);
                    seekBar.style.backgroundImage = -"webkit-gradient(linear,left top,right top,"+
                        "color-stop("+v+", yellow),"+"color-stop("+v+", black)"+")"; 
                }
//                function end(){
//                    console.log(presentSong.currentTime)
//                    if(presentSong.ended){
//                        console.log(stage+' '+ended);
//                        active == false;
//                        
//                    }
//                }
//                

            } catch (err) {
                console.log(err);
            }
        }
    }
    //--------------------------------------------------------------//

    const play = new createMusic(audioArray, imgArray, nameArray, artistArray);

    const player = new mainPlayer(play.createPlayer(), play.createImg(), play.Title(), play.list());
    let imageSelect = document.querySelectorAll('.play_img');
    let list = document.querySelectorAll('.list');
    let selected;
    //main method
    function main(pos){
        player.imgPlaying(pos);
            clearInterval(seek);
             player.seekable(pos);
            selected = player.moveSong(pos);
            
// selected song Image slide animations
            rollUp.onclick = function () {
                showcase.removeAttribute('id', 'big-display');
                imageSelect[pos].removeAttribute('id', 'big-img');
                rollUp.style.visibility = 'hidden';
              
            }
            button.onclick = function () {
                player.utility(pos);
            }
            
        
    }
    let imgSelector = (pos) => {                     
        showcase.setAttribute('id', 'big-display');
        imageSelect[pos].setAttribute('id', 'big-img');
        rollUp.style.visibility = 'visible';
        
                                
        if (stage.length > 1) {
         imageSelect[stage[0]].removeAttribute('id', 'big-img');

        showcase.scrollLeft += imageSelect[pos].getBoundingClientRect().x - 30;
            } else {
                showcase.scrollLeft += imageSelect[pos].getBoundingClientRect().x - 30;
            }
            
    }
    let imgSlider = (pos) => {
                    showcase.scrollLeft += imageSelect[pos].getBoundingClientRect().x - 100;
                    
    }
    for (let j in audioArray) {
   
        imageSelect[j].onclick = function () {
            main(j);
            imgSelector(j)
            
            selected.onended = () => {
                console.log(stage);
                j = parseInt(j,10)+1
                main(j);
                imgSelector(j);
            }
            left.onclick = function(){
                j = parseInt(j,10)-1
                main(j);
                imgSelector(j);
            }
            right.onclick = function(){
                j = parseInt(j,10)+1
                main(j);
                imgSelector(j);
            }

    }

        list[j].onclick = function () {
            main(j);
            imgSlider(j);
            imageSelect[j].onclick = () => imgSelector(j);
            selected.onended = () => {
                console.log("well well");
                j = parseInt(j,10)+1
                main(j);
                imgSlider(j);
            }
            left.onclick = function(){
                j = parseInt(j,10)-1
                main(j);
                imgSlider(j);
            }
            right.onclick = function(){
                j = parseInt(j,10)+1
                main(j);
                imgSlider(j);
            }
        }
            
     if(active == false && stage.length == 0){
         button.onclick = function(j){
             j = 0
            main(j);
            imgSelector(j)
            selected.onended = () => {
                console.log("well well");
                j = parseInt(j,10)+1
                main(j);
                imgSelector(j);
            }
            left.onclick = function(){
                j = parseInt(j,10)-1
                main(j);
                imgSelector(j);
            }
            right.onclick = function(){
                j = parseInt(j,10)+1
                main(j);
                imgSelector(j);
            }
 
         }
     } 
    }
    




}