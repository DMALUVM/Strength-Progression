function roundToNearest5(num) {
  return Math.round(num / 5) * 5;
}

function calculateRoutine(type) {
  let currentMax, targetMax, workoutDays, experience, includeAccessory;
  let routineElement;

  if (type === 'squat') {
    currentMax = parseFloat(document.getElementById("currentMaxSquat").value);
    targetMax = parseFloat(document.getElementById("targetMaxSquat").value);
    workoutDays = parseInt(document.getElementById("workoutDaysSquat").value);
    experience = document.getElementById("experienceSquat").value;
    includeAccessory = document.getElementById("includeAccessorySquat").value === "yes";
    routineElement = document.getElementById("workoutRoutineSquat");
  } else if (type === 'bench') {
    currentMax = parseFloat(document.getElementById("currentMaxBench").value);
    targetMax = parseFloat(document.getElementById("targetMaxBench").value);
    workoutDays = parseInt(document.getElementById("workoutDaysBench").value);
    experience = document.getElementById("experienceBench").value;
    includeAccessory = document.getElementById("includeAccessoryBench").value === "yes";
    routineElement = document.getElementById("workoutRoutineBench");
  }

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
      let weight = roundToNearest5(currentMax * intensity);
      routine += `<li>Day ${day}: ${sets} sets of ${reps} reps at ${weight} lbs (${(intensity * 100).toFixed(0)}% of 1RM)</li>`;
      
      if (includeAccessory) {
        let accessoryRoutine = "";
        if (type === 'squat') {
          let lungeWeight = roundToNearest5(currentMax * 0.5);  // Front Rack Lunges
          let gobletWeight = roundToNearest5(currentMax * 0.4);  // Goblet Squats
          let splitSquatWeight = roundToNearest5(currentMax * 0.4);  // Bulgarian Split Squats

          accessoryRoutine += "<ul>";
          accessoryRoutine += `<li>Front Rack Lunges: 3 sets of 8 reps per leg with ${lungeWeight} lbs</li>`;
          accessoryRoutine += `<li>Goblet Squats: 3 sets of 10 reps with ${gobletWeight} lbs kettlebell/dumbbell</li>`;
          accessoryRoutine += `<li>Bulgarian Split Squats: 3 sets of 10 reps per leg with ${splitSquatWeight} lbs kettlebell/dumbbell</li>`;
          accessoryRoutine += "<li>Core Work: 3 sets of 10 reps (Hanging Leg Raises or Ab Wheel Rollouts)</li>";
          accessoryRoutine += "<li>Mobility Work: <ul>";
          accessoryRoutine += "<li>Ankle Mobility Drills: 2 sets of 10 reps per leg (Ankle Circles, Toe Raises)</li>";
          accessoryRoutine += "<li>Hip Flexor Stretching: 2 sets of 30 seconds per side (Kneeling Hip Flexor Stretch)</li>";
          accessoryRoutine += "<li>Thoracic Spine Mobility: 2 sets of 10 reps (Cat-Cow Stretch, Thoracic Rotations)</li>";
          accessoryRoutine += "</ul></li>";
        } else if (type === 'bench') {
          let inclinePressWeight = roundToNearest5(currentMax * 0.6);  // Incline Dumbbell Press
          let dipWeight = roundToNearest5(currentMax * 0.4);  // Tricep Dips
          let shoulderPressWeight = roundToNearest5(currentMax * 0.5);  // Shoulder Press
          let flyWeight = roundToNearest5(currentMax * 0.3);  // Chest Flyes

          accessoryRoutine += "<ul>";
          accessoryRoutine += `<li>Incline Dumbbell Press: 3 sets of 10 reps with ${inclinePressWeight} lbs</li>`;
          accessoryRoutine += `<li>Tricep Dips: 3 sets of 8 reps with ${dipWeight} lbs</li>`;
          accessoryRoutine += `<li>Shoulder Press: 3 sets of 10 reps with ${shoulderPressWeight} lbs</li>`;
          accessoryRoutine += `<li>Chest Flyes: 3 sets of 12 reps with ${flyWeight} lbs</li>`;
          accessoryRoutine += "<li>Core Work: 3 sets of 30 seconds (Planks or Russian Twists)</li>";
          accessoryRoutine += "<li>Mobility Work: <ul>";
          accessoryRoutine += "<li>Shoulder Mobility Drills: 2 sets of 10 reps (Shoulder Circles, Banded Pull-Aparts)</li>";
          accessoryRoutine += "<li>Thoracic Spine Mobility: 2 sets of 10 reps (Cat-Cow Stretch, Thoracic Rotations)</li>";
          accessoryRoutine += "</ul></li>";
        }
        routine += accessoryRoutine + "</ul>";
      }
    }
    routine += `</ul>`;
  }

  routineElement.innerHTML = routine;
}
