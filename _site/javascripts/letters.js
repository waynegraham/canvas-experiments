var kin, letter, fonts, canvas, context;

      fonts = [
        'Calibri',
        'Times New Roman',
        'Arial',
        'Verdana',
        'Courier New',
        'Comic Sans MS',
        'Lucida Console',
        'Georgia'
      ]

      function Letter(){
        
      }

      function randomLetter() {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        var randomChar = Math.floor(Math.random() * chars.length);
        return chars.substring(randomChar, randomChar + 1)
      }

      function randomFont() {
        var key = randomNumberRange(0, fonts.length - 1);
        return fonts[key];
      }

      function randomColor(format)
      {
       var rint = Math.round(0xffffff * Math.random());
       switch(format)
       {
        case 'hex':
         return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
        break;

        case 'rgb':
         return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
        break;

        default:
         return rint;
        break;
       }
      }

      // random number generator
      // @param int from beginning of the range
      // @param int to end of the range
      // @return int random number within a range
      function randomNumberRange(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
      }

      $(document).ready(function(){
        canvas = document.getElementById('letters');
        context = canvas.getContext('2d');

        var stage = new Kinetic.Stage(canvas, 100);
        var theta = 0, tilt = 1;

        stage.setUpdateStage(function(){
          theta += 0.02;
          tilt = Math.sin(theta / 2);
        });

        stage.setDrawStage(function(){ // issue with frame buffering
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.scale(1, tilt);
          context.rotate(theta);

          font = randomFont();
          fontSize = randomNumberRange(12,72);

          fontString = fontSize + "pt " + font;

          context.fillStyle = randomColor('hex');
          context.font = fontString;
          context.fillText(randomLetter(), randomNumberRange(0,800), randomNumberRange(0,800));

          context.restore();
        });

        stage.start();
      });

