console.log("beforegameplay Loaded!!!");
console.log("Teste 1");
var bold2 = new Font("Assets/Font/bold.ttf");
var bold3 = new Font("Assets/Font/bold.ttf");
var text_new = new Font("Assets/Font/bold.ttf");
var text_player = new Font("Assets/Font/bold.ttf");// it's breaking the code for what seems no reason ~DevECoisas
text_player.scale = 0.6;
text_new.color = Color.new(29,29,29);
text_new.scale = 0.8;
console.log("Teste 2");
var isInInterfaceP = false;
var inter = new Image("Assets/Textures/interface.png");
console.log("Teste 3");
var zz = text_new.getTextSize("NEW");
var centerx = 173 + (294 - zz.width) / 2;
var frames_head_player1 = [];
var frames_head_player2 = [];
var option_player_1 = 1;
var direction_player = false;
var play_animation = false;
var time_anim = null;
var head = [1, 0];
console.log("Teste 4");
var interf = false;
var transparent = false;
var option_save = 1;
var scph = false;
console.log("Teste 5");
function loadImgHead() {
  for (var z = 1; z < 9; z++) {
    frames_head_player1.push(new Image("Assets/Textures/players/cuphead/HEAD_MENU/" + z + ".png"));
  }
  for (var p = 1; p < 9; p++) {
    frames_head_player2.push(new Image("Assets/Textures/players/mugman/HEAD_MENU/" + p + ".png"));
  }
}

function loadFrameHead(frame, width, height, x, y) {
  if (frames_head_player1[frame] && frames_head_player1[frame].ready()) {
    frames_head_player1[frame].width = width;
    frames_head_player1[frame].height = height;
    frames_head_player1[frame].draw(x, y);
  }
}

function loadFrameHead2(frame, width, height, x, y) {
  if (frames_head_player2[frame] && frames_head_player2[frame].ready()) {
    frames_head_player2[frame].width = width;
    frames_head_player2[frame].height = height;
    frames_head_player2[frame].draw(x, y);
  }
}


function drawInterfaceP() {
  Background.draw(0, 0);

  if (interf) {
    inter.width = 328;
    inter.height = 322;
    slot.width = 294;
    slot.height = 73;
    select_img.width = 294;
    select_img.height = 73;

    inter.draw(canvas.width / 2 - inter.width / 2, canvas.height / 2 - inter.height / 2);

    slot.draw(173, 80);
    slot.draw(173, 167);
    slot.draw(173, 254);

    text_new.scale = 0.8;
    var textColor = Color.new(29, 29, 29); 

    text_new.color = textColor;
    text_new.print(centerx, 80 + (73 - zz.height) / 2, "NEW");
    text_new.print(centerx, 167 + (73 - zz.height) / 2, "NEW");
    text_new.print(centerx, 254 + (73 - zz.height) / 2, "NEW");

    if (!transparent) {
      switch (option_save) {
        case 1:
          select_img.draw(173, 80);
          text_new.color = Color.new(255, 255, 255); 
          text_new.print(centerx, 80 + (73 - zz.height) / 2, "NEW");
          break;
        case 2:
          select_img.draw(173, 167);
          text_new.color = Color.new(255, 255, 255); 
          text_new.print(centerx, 167 + (73 - zz.height) / 2, "NEW");
          break;
        case 3:
          select_img.draw(173, 254);
          text_new.color = Color.new(255, 255, 255); 
          text_new.print(centerx, 254 + (73 - zz.height) / 2, "NEW");
          break;
      }
    }

    if (pad.justPressed(Pads.CROSS) && !transparent) {
      playSoundSelect();
      transparent = true;
      scph = false;
    }

    if (transparent) {
      Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, 85));
      select_img.width = 296;
      select_img.height = 75;

      switch (option_save) {
        case 1:
          select_img.draw(173, 80);
          if (option_player_1 == 2) {
            Draw.rect(173, 80, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.print(184, 93, "PLEASE SELECT \nPLAYER");
          loadFrameHead(head[0], 59, 59, 327, 85);
          loadFrameHead2(head[1], 59, 59, 396, 85);
          break;
        case 2:
          select_img.draw(173, 167);
          if (option_player_1 == 2) {
            Draw.rect(173, 167, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.print(184, 180, "PLEASE SELECT \nPLAYER");
          loadFrameHead(head[0], 59, 59, 327, 172);
          loadFrameHead2(head[1], 59, 59, 396, 172);
          break;
        case 3:
          select_img.draw(173, 254);
          if (option_player_1 == 2) {
            Draw.rect(173, 254, 296, 75, Color.new(156, 156, 98, 80));
          }
          text_player.print(184, 267, "PLEASE SELECT \nPLAYER");
          loadFrameHead(head[0], 59, 59, 327, 259);
          loadFrameHead2(head[1], 59, 59, 396, 259);
          break;
      }

      if (pad.justPressed(Pads.CROSS) && transparent && !play_animation && scph) {
        time_anim = Timer.new();
        Timer.reset(time_anim);
        Timer.setTime(time_anim, 0);
        Timer.resume(time_anim);
        play_animation = true;
      }
      scph = true;

      if (play_animation) {
        if (Timer.getTime(time_anim) >= 50) {
          Timer.setTime(time_anim, 0);
          if (head[0] == 7 || head[1] == 7) {
            if (!direction_player) {
              direction_player = true;
            }
          }
          if (head[0] == 2 || head[1] == 2) {
            if (direction_player) {
              Sound.deinit();
              console.log("Loading Book...");
              std.loadScript("/Scripts/Bookscript/book.js")
            }
          }
          if (!direction_player) {
            switch (option_player_1) {
              case 1:
                head[0]++;
                break;
              case 2:
                head[1]++;
                break;
            }
          }
          if (direction_player) {
            switch (option_player_1) {
              case 1:
                head[0]--;
                break;
              case 2:
                head[1]--;
                break;
            }
          }
        }
      }
    }
  }
}


function handlebeforegameplayMenu() {
  if (pad.justPressed(Pads.DOWN) && !stop) {
    if (option_save === 3) {
      option_save = 1;
    } else {
      option_save++;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.UP) && !stop) {
    if (option_save === 1) {
      option_save = 3;
    } else {
      option_save--;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.CROSS) && !stop) {
    playSoundSelect();
    stop = true;
    interf = true;
  }

  if (pad.justPressed(Pads.RIGHT) && !play_animation) {
    if (option_player_1 === 2) {
      option_player_1 = 1;
      head[0] = 1;
      head[1] = 0;
    } else {
      option_player_1 = 2;
      head[0] = 0;
      head[1] = 1;
    }
    playSoundSelect();
  }

  if (pad.justPressed(Pads.LEFT) && !play_animation) {
    if (option_player_1 === 1) {
      option_player_1 = 2;
      head[0] = 0;
      head[1] = 1;
    } else {
      option_player_1 = 1;
      head[0] = 1;
      head[1] = 0;
    }
    playSoundSelect();
  }

  drawInterfaceP();
}
console.log("Teste 6");
loadImgHead();
console.log("Teste 7");
interf = true;
console.log("Done!!!");
