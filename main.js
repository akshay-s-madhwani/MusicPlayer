window.onload = function () {

setTimeout(()=>{document.querySelector('#load').style.display = 'none';
   document.querySelector('.player_body').style.display = 'block';},5600);
    
    
    //Variables
    let audioArray = ["songs/Benny%20Blanco%20Halsey%20&%20Khalid-Eastside.mp3",

        "songs/Alan%20Walker,%20Ava%20Max%20-%20Alone,%20Pt.%20II.mp3", "songs/Diplo_-_Revolution_feat_Faustix_Imanos_and_Kai_Official_Music_Video%5BSaveFrom.online%5D.mp3", "songs/Ed%20Sheeran%20-%20Perfect%20[Mw%20Hits].mp3", "songs/Loud%20Luxury%20Ft.%20Brando-Body.mp3", "songs/Ava%20Max%20-%20Sweet%20but%20Psycho.mp3", "songs/Shawn%20Mendes-Treat%20You%20Better.mp3"
    ];
    let imgArray = ["img/eastside.jpg", "img/external-content.duckduckgo.com.jpg", "img/re.jpg", "img/Ed-Sheeran-Divide Cover.jpg", "img/body.jpg", "img/Cover%20Ava%20Max%20-%20Sweet%20but%20Psycho.jpg", "img/treat%20u%20better.jpg"];

    let nameArray = ["Eastside", "Alone Pt.2", "Revolution", "Perfect", "Body", "Sweet but Psycho", "Treat You Better"];

    let artistArray = ["Benny Blanco, Halsey & Khalid", "Alan Walker ft.Ava Max", "Diplo ft. Kai & Faustix Imanos", "Ed Sheeran", "Loud Luxury ft. Brando", "Ava max", "Shawn Mendes"];
    const showcase = document.querySelector('.display');
    const display = document.querySelector('.display_inner');
    const rollUp = document.querySelector('.fa-list');
    const theme = document.querySelector('.fa-paint-brush');
    const left = document.querySelector('.fa-chevron-left');
    const right = document.querySelector('.fa-chevron-right');
    let button = document.querySelectorAll('.play')[0];
    let active = false;
    let songDisplay = document.querySelector('.currentSong');
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
        listView.appendChild(uList)
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
//        left.onclick = function () {
//            stage.push(parseInt(j, 10) - 1)
//        };
//
//        right.onclick = function () {
//            stage.push(parseInt(j, 10) + 1)
//        };
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
            this.music[j].play();
            button.setAttribute('class', ' fa fa-pause-circle-o play');
            songDisplay.innerHTML = `<p>${this.artist[j].childNodes[0].innerText}</p> <p> ${this.artist[j].childNodes[1].innerText}</p>`;
            return active;
        }



    }
    mainPlayer.prototype.moveSong = function (j) {
    console.log(this.music[j]);
        if(this.music[j].currentTime == 2){
            console.log(stage[1]+1);
        }
        
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
        } else if (active == true && stage.length >= 1) {
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
                    if(presentSong.currentTime==5){
                        player.imgPlaying(stage[1]+1);
                    }
                }, 1000);

                function stopSeek() {
                    console.log(presentSong)
                    clearInterval(seek);
                    seekBar.value = 0;
                }

                seekBar.onchange = function () {
                    presentSong.currentTime = seekBar.value;
                    seekBar.value = presentSong.currentTime;
                }
                function end(){
                    console.log(presentSong.currentTime)
                    if(presentSong.ended){
                        console.log(stage+' '+ended);
                        active == false;
                        
                    }
                }
                requestAnimationFrame()

            } catch (err) {
                console.log(err);
            }
        }
    }
    //--------------------------------------------------------------//

    const play = new createMusic(audioArray, imgArray, nameArray, artistArray);

    const player = new mainPlayer(play.createPlayer(), play.createImg(), play.Title(), play.list());
    let im = document.querySelectorAll('.play_img');
    let list = document.querySelectorAll('.list');
    for (let j in audioArray) {
       
        im[j].onclick = function () {
            player.imgPlaying(j);
            clearInterval(seek);
            player.seekable(j);
            showcase.setAttribute('id', 'big-display');
            im[j].setAttribute('id', 'big-img');
            rollUp.style.visibility = 'visible';
            theme.style.display = ' none';
            
            if (stage.length > 1) {
                im[stage[0]].removeAttribute('id', 'big-img');

                showcase.scrollLeft += im[j].getBoundingClientRect().x - 30;
            } else {
                showcase.scrollLeft += im[j].getBoundingClientRect().x - 30;
            }
            rollUp.onclick = function () {
                showcase.removeAttribute('id', 'big-display');
                im[j].removeAttribute('id', 'big-img');
                rollUp.style.visibility = 'hidden';
                theme.style.display = 'block';
            }
            button.onclick = function () {
                player.utility(j);
            }
            
        
    }

        list[j].onclick = function () {
            
        left.onclick = function () {
            if (stage.length > 1) {
               j-=1;
                player.imgPlaying(j);
                 button.onclick = function () {
                player.utility(j);
            }
            }
        };
        right.onclick = function () {
            if (stage.length > 1) {
               j+=1;
                player.imgPlaying(j);
                 button.onclick = function () {
                player.utility(j);
            }
            }
        };
            player.imgPlaying(j);
            clearInterval(seek);
            player.seekable(j);
            showcase.scrollLeft += im[j].getBoundingClientRect().x - 100;

            button.onclick = function () {
                player.utility(j);
            }
                left.onclick = function () {
                    player.imgPlaying(parseInt(j, 10) - 1)
                };

                right.onclick = function () {
                    player.imgPlaying(parseInt(j, 10) + 2)
                };

            
            button.onclick = function () {
                player.utility(j);
            }
        }
        console.log(stage);
//        left.onclick = function () {
//            if (stage.length > 1) {
//               j=stage[1]-1;
//                console.log(stage)
//                player.imgPlaying(j);
//            }
//        };
//        right.onclick = function () {
//            if (stage.length > 1) {
//               j = stage[1]+1;
//                console.log(stage);
//                player.imgPlaying(j);
//            }
 }
      
    for(let i = 0;i<=list.length;i++){
        theme.onclick = function () {
        if (theme.style.color == 'yellow') {
            listView.style.backgroundColor = 'rgb(212,241,19)';
            list[i].setAttribute( 'id','secondShadow');
            theme.style.color = 'maroon';
        } else {
            listView.style.backgroundColor = 'maroon';
            list[i].removeAttribute( 'id','secondShadow');
            theme.style.color = 'yellow';
            }
        }
    }
    




}