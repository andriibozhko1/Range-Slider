(function() {
  const range = document.querySelector(".range");
  const firstSlider = document.querySelector(".first-slider");
  const secondSlider = document.querySelector(".second-slider");
  const maxValue = document.querySelector(".maxValue");
  const minValue = document.querySelector(".minValue");
  let coordinates;
  let sliders;
  let percentCoordinates;

  firstSlider.dataset.value = 0;
  secondSlider.dataset.value = range.offsetWidth;

  maxValue.value = secondSlider.dataset.percent;
  minValue.value = firstSlider.dataset.percent;

  const moveSliders = function(e) {
    coordinates = e.layerX;

    if (e.target !== sliders) {
      percentCoordinates = Math.floor(coordinates * 0.199203187250996);
      sliders.dataset.percent = percentCoordinates;

      if (!e.target.dataset.slider) {
        sliders.dataset.value = coordinates;
        sliders.style.left = sliders.dataset.value + "px";
        maxValue.value = secondSlider.dataset.percent;
        minValue.value = firstSlider.dataset.percent;
        if (firstSlider.dataset.value >= secondSlider.dataset.value - 50) {
          firstSlider.style.left = secondSlider.dataset.value - 50 + "px";
        }
      }
    }
  };

  range.addEventListener('click', function(e) {
    if(!e.target.dataset.slider) {
      sliders.dataset.value = e.layerX;
      sliders.dataset.percent = Math.floor(e.layerX * 0.199203187250996);
      sliders.style.left = e.layerX + 'px';
      if(sliders.classList.contains('first-slider')) {
        minValue.value = sliders.dataset.percent;
      }
      if(sliders.classList.contains('second-slider')) {
        maxValue.value = sliders.dataset.percent;
      }
    }
  })

  maxValue.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      secondSlider.style.left = maxValue.value + "%";
    }
  });

  minValue.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) {
      firstSlider.style.left = minValue.value + "%";
    }
  });

  document.body.addEventListener("mousedown", function(e) {
    if (e.target.dataset.slider) {
      sliders = e.target;
      range.addEventListener("mousemove", moveSliders);
    }
  });
  document.addEventListener("mouseup", function() {
    range.removeEventListener("mousemove", moveSliders);
  });
})();
