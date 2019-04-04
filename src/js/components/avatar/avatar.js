import Cropper from 'cropperjs';
export default class Avatar {
  index(){
    var avatar = document.getElementById('avatar');
    var image = document.getElementById('image');
    var input = document.getElementById('input');
    var $progress = $('.progress');
    var $progressBar = $('.progress-bar');
    var $alert = $('.alert');
    var $modal = $('#modal');
    var $close = $modal.find('.close');
    var cropper;
    input.addEventListener('change', function(e) {
      var files = e.target.files;
      var done = function(url) {
        input.value = '';
        image.src = url;
        $alert.hide();
        $modal.fadeIn('slow', function() {
          cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 3,
          });
        });
      };
      var reader;
      var file;
      var url;

      if (files && files.length > 0) {
        file = files[0];

        if (URL) {
          done(URL.createObjectURL(file));
        } else if (FileReader) {
          reader = new FileReader();
          reader.onload = function(e) {
            done(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    });

    $close.off('click').on('click',function () {
      $modal.fadeOut('show', function() {
        cropper.destroy();
        cropper = null;
      });
    });

    document.getElementById('crop').addEventListener('click', function() {
      var initialAvatarURL;
      var canvas;

      $modal.fadeOut('show', function() {
        cropper.destroy();
        cropper = null;
      });

      if (cropper) {
        canvas = cropper.getCroppedCanvas({
          width: 160,
          height: 160,
        });
        initialAvatarURL = avatar.src;
        avatar.src = canvas.toDataURL();
        $progress.show();
        $alert.removeClass('alert-success alert-warning');
        canvas.toBlob(function(blob) {
          var formData = new FormData();

          formData.append('avatar', blob, 'avatar.jpg');
          $.ajax('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,

            xhr: function() {
              var xhr = new XMLHttpRequest();

              xhr.upload.onprogress = function(e) {
                var percent = '0';
                var percentage = '0%';

                if (e.lengthComputable) {
                  percent = Math.round((e.loaded / e.total) * 100);
                  percentage = percent + '%';
                  // $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                  $progress.css("opacity",percentage/100);
                }
              };

              return xhr;
            },

            success: function() {
              // $alert.show().addClass('alert-success').text('Upload success');
              debug('Upload success');
            },

            error: function() {
              avatar.src = initialAvatarURL;
              // $alert.show().addClass('alert-warning').text('Upload error');
              debug('Upload error');
            },

            complete: function() {
              $progress.hide();
            },
          });
        });
      }
    });
  }

};
