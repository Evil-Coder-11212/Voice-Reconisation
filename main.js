function startClassification() {
  navigator.mediaDevices.getUserMedia({ media: true });
  classifier = ml5.soundClassifier(
    "https://teachablemachine.withgoogle.com/models/u02fOYRBx/model.json",
    () => {
      classifier.classify(gotResult);
    }
  );
}

function gotResult(error, result) {
  if (error) {
    console.error("Something went wrong. Please try again");
  } else {
    document.querySelector(
      "#result_label"
    ).textContent = `I can hear: ${result[0].label}`;
    document.querySelectorAll(".rgb").forEach((element) => {
      element.style.color = `rgb(${Math.floor(Math.random() * 100) + 1}, ${
        Math.floor(Math.random() * 100) + 1
      }, ${Math.floor(Math.random() * 100) + 1})`;
      console.log(element);
    });
    console.log(result);
    if (result[0].label == "Barking") {
      document.querySelector("#animal_image").src = "./bark.gif";
    } else if (result[0].label == "Background Noise") {
      document.querySelector("#animal_image").src = "./listen.gif";
    } else {
      document.querySelector("#animal_image").src = "./meow.gif";
    }
  }
}
