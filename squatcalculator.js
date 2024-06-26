function calculateRoutine() {
  const currentMax = parseFloat(document.getElementById("currentMax").value);
  const targetMax = parseFloat(document.getElementById("targetMax").value);
  const workoutDays = parseInt(document.getElementById("workoutDays").value);
  const experience = document.getElementById("experience").value;
  const includeAccessory = document.getElementById("includeAccessory").value === "yes";

  console.log("Current Max:", currentMax);
  console.log("Target Max:", targetMax);
  console.log("Workout Days:", workoutDays);
  console.log("Experience:", experience);
  console.log("Include Accessory:", includeAccessory);

  if (isNaN(currentMax) || isNaN(workoutDays)) {
    alert("Please enter valid numbers for Current Max and Workout Days");
    return;
  }

  let routine = "";

  let baseVolume = 0;
  let intensityIncrement = 0;
  let sets = 0;
  let reps = 0;

  switch (experience) {
    case "beginner":
      baseVolume = 0.7;
      intensityIncrement = 0.02;
      sets = 3;
      reps = 5;
      break;
    case "intermediate":
      baseVolume = 0.75;
      intensityIncrement = 0.025;
      sets = 4;
      reps = 5;
      break;
    case "advanced":
      baseVolume = 0.8;
      intensityIncrement = 0.03;
      sets = 5;
      reps = 3;
      break;
  }

  for (let week = 1; week <= 4; week++) {
    routine += `<h3>Week ${week}</h3><ul>`;
    for (let day = 1; day <= workoutDays; day++) {
      let intensity = baseVolume + (week - 1) * intensityIncrement;
      let weight = (currentMax * intensity).toFixed(2);
      routine += `<li>Day ${day}: ${sets} sets of ${reps} reps at ${weight} lbs (${(intensity * 100).toFixed(0)}% of 1RM)</li>`;
      if (includeAccessory) {
        routine += "<ul>";
        routine += "<li>Accessory 1: Lunges - 3 sets of 10 reps per leg</li>";
        routine += "<li>Accessory 2: Planks - 3 sets of 60 seconds</li>";
        routine += "</ul>";
      }
    }
    routine += `</ul>`;
  }

  document.getElementById("workoutRoutine").innerHTML = routine;
}
