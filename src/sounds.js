
class Sounds {
  constructor() {
    this.muted = false;
    
    this.bgMain = this.createAudio('res/sounds/background.wav', 0.4);
    this.bgMain.loop = true;
    
    this.audios = {};
  }

  playBackground() {
    this.bgMain.play();
  }

  stopBackground() {
    clearInterval(this.bgInterval);
    this.bgMain.pause();
    this.bgMain.currentTime = 0;
  }

  play(src, volume) {
    if (src in this.audios) {
      this.audios[src].currentTime = 0;
    } else {
      this.audios[src] = this.createAudio(src, volume);
    }
    return new Promise((res, rej) => {
      this.audios[src].onended = () => res();
      this.audios[src].play();
    });
  }

  createAudio(src, volume = 1) {
    let audio = new Audio(src);
    audio.volume = volume;
    audio.muted = this.muted;
    return audio;
  }

  getAllAudios() {
    return [this.bgMain, ...Object.values(this.audios)];
  }

  mute() {
    this.muted = true;
    this.getAllAudios().forEach(audio => audio.muted = true);
  }

  unmute() {
    this.muted = false;
    this.getAllAudios().forEach(audio => audio.muted = false);
  }
}

export default new Sounds();
