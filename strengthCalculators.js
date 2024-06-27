let weightUnit = 'lbs';

function roundToNearest5(num) {
  return Math.round(num / 5) * 5;
}

function showCalculator(type) {
  document.getElementById('squatContainer').style.display = 'none';
  document.getElementById('benchContainer').style.display = 'none';
  document.getElementById('deadliftContainer').style.display = 'none';

  document.getElementById('navSquat').classList.remove('active');
  document.getElementById('navBench').classList.remove('active');
  document.getElementById('navDeadlift').classList.remove('active');

  if (type === 'squat') {
    document.getElementById('squatContainer').style.display = 'block';
    document.getElementById('navSquat').classList.add('active');
  } else if (type === 'bench') {
    document.getElementById('benchContainer').style.display = 'block';
    document.getElementById('navBench').classList.add('active');
  } else if (type === 'deadlift') {
    document.getElementById('deadliftContainer').style.display = 'block';
    document.getElementById('navDeadlift').classList.add('active');
  }
}

function updateWeightUnit() {
  weightUnit = document.getElementById('weightUnit').value;
  document.querySelectorAll('.weight-unit').forEach(el => el.textContent = weightUnit);
}

function resetForm(type) {
  document.getElementById(`${type}Form`).reset();
  document.getElementById(`estimatedMax${type.charAt(0).toUpperCase() + type.slice(1)}`).innerHTML = '';
  document.getElementById(`workoutRoutine${type.charAt(0).toUpperCase() + type.slice(1)}`).innerHTML = '';
  document.getElementById(`formTips${type.charAt(0).toUpperCase() + type.slice(1)}`).innerHTML = '';
}

function calculateRoutine(type) {
  let currentMax, workoutDays, experience, includeAccessory;
  let routineElement, estimatedMaxElement, formTipsElement;

  if (type === 'squat') {
    currentMax = parseFloat(document.getElementById("currentMaxSquat").value);
    workoutDays = parseInt(document.getElementById("workoutDaysSquat").value);
    experience = document.getElementById("experienceSquat").value;
    includeAccessory = document.getElementById("includeAccessorySquat").value === "yes";
    routineElement = document.getElementById("workoutRoutineSquat");
    estimatedMaxElement = document.getElementById("estimatedMaxSquat");
    formTipsElement = document.getElementById("formTipsSquat");
  } else if (type === 'bench') {
    currentMax = parseFloat(document.getElementById("currentMaxBench").value);
    workoutDays = parseInt(document.getElementById("workoutDaysBench").value);
    experience = document.getElementById("experienceBench").value;
    includeAccessory = document.getElementById("includeAccessoryBench").value === "yes";
    routineElement = document.getElementById("workoutRoutineBench");
    estimatedMaxElement = document.getElementById("estimatedMaxBench");
    formTipsElement = document.getElementById("formTipsBench");
  } else if (type === 'deadlift') {
    currentMax = parseFloat(document.getElementById("currentMaxDeadlift").value);
    workoutDays = parseInt(document.getElementById("workoutDaysDeadlift").value);
    experience = document.getElementById("experienceDeadlift").value;
    includeAccessory = document.getElementById("includeAccessoryDeadlift").value === "yes";
    routineElement = document.getElementById("workoutRoutineDeadlift");
    estimatedMaxElement = document.getElementById("estimatedMaxDeadlift");
    formTipsElement = document.getElementById("formTipsDeadlift");
  }

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
      routine += `<li>Day ${day}: ${sets} sets of ${reps} reps at ${weight} ${weightUnit} (${(intensity * 100).toFixed(0)}% of 1RM)</li>`;
      
      if (includeAccessory) {
        let accessoryRoutine = "";
        if (type === 'squat') {
          let lungeWeight = Math.min(roundToNearest5(currentMax * 0.5), 55);
          let gobletWeight = Math.min(roundToNearest5(currentMax * 0.4), 53);
          let splitSquatWeight = Math.min(roundToNearest5(currentMax * 0.4), 55);

          accessoryRoutine += "<ul>";
          accessoryRoutine += `<li>Front Rack Lunges: 3 sets of 8 reps per leg with ${lungeWeight} ${weightUnit}</li>`;
          accessoryRoutine += `<li>Goblet Squats: 3 sets of 10 reps with ${gobletWeight} ${weightUnit} kettlebell/dumbbell</li>`;
          accessoryRoutine += `<li>Bulgarian Split Squats: 3 sets of 10 reps per leg with ${splitSquatWeight} ${weightUnit} kettlebell/dumbbell</li>`;
          accessoryRoutine += "<li>Core Work: 3 sets of 10 reps (Hanging Leg Raises or Ab Wheel Rollouts)</li>";
          accessoryRoutine += "<li>Mobility Work: <ul>";
          accessoryRoutine += "<li>Ankle Mobility Drills: 2 sets of 10 reps per leg (Ankle Circles, Toe Raises)</li>";
          accessoryRoutine += "<li>Hip Flexor Stretching: 2 sets of 30 seconds per side (Kneeling Hip Flexor Stretch)</li>";
          accessoryRoutine += "<li>Thoracic Spine Mobility: 2 sets of 10 reps (Cat-Cow Stretch, Thoracic Rotations)</li>";
          accessoryRoutine += "<li>Hamstring Stretching: 2 sets of 30 seconds per side (Standing Toe Touch)</li>";
          accessoryRoutine += "</ul></li>";
        } else if (type === 'bench') {
          let inclinePressWeight = roundToNearest5(currentMax * 0.6);
          let dipWeight = roundToNearest5(currentMax * 0.4);
          let shoulderPressWeight = roundToNearest5(currentMax * 0.5);
          let flyWeight = roundToNearest5(currentMax * 0.3);

          accessoryRoutine += "<ul>";
          if (inclinePressWeight > 110) {
            accessoryRoutine += `<li>Incline Barbell Press: 3 sets of 10 reps with ${inclinePressWeight} ${weightUnit}</li>`;
          } else {
            accessoryRoutine += `<li>Incline Dumbbell Press: 3 sets of 10 reps with ${Math.min(inclinePressWeight, 110)} ${weightUnit}</li>`;
          }
          if (dipWeight > 110) {
            accessoryRoutine += `<li>Barbell Tricep Extensions: 3 sets of 8 reps with ${dipWeight} ${weightUnit}</li>`;
          } else {
            accessoryRoutine += `<li>Tricep Dips: 3 sets of 8 reps with ${Math.min(dipWeight, 110)} ${weightUnit}</li>`;
          }
          if (shoulderPressWeight > 110) {
            accessoryRoutine += `<li>Barbell Shoulder Press: 3 sets of 10 reps with ${shoulderPressWeight} ${weightUnit}</li>`;
          } else {
            accessoryRoutine += `<li>Shoulder Press: 3 sets of 10 reps with ${Math.min(shoulderPressWeight, 110)} ${weightUnit}</li>`;
          }
          if (flyWeight > 110) {
            accessoryRoutine += `<li>Barbell Chest Flyes: 3 sets of 12 reps with ${flyWeight} ${weightUnit}</li>`;
          } else {
            accessoryRoutine += `<li>Chest Flyes: 3 sets of 12 reps with ${Math.min(flyWeight, 110)} ${weightUnit}</li>`;
          }
          accessoryRoutine += "<li>Core Work: 3 sets of 30 seconds (Planks or Russian Twists)</li>";
          accessoryRoutine += "<li>Mobility Work: <ul>";
          accessoryRoutine += "<li>Shoulder Mobility Drills: 2 sets of 10 reps (Shoulder Circles, Banded Pull-Aparts)</li>";
          accessoryRoutine += "<li>Thoracic Spine Mobility: 2 sets of 10 reps (Cat-Cow Stretch, Thoracic Rotations)</li>";
          accessoryRoutine += "</ul></li>";
        } else if (type === 'deadlift') {
          let romanianDeadliftWeight = Math.min(roundToNearest5(currentMax * 0.6), 300);
          let hipThrustWeight = Math.min(roundToNearest5(currentMax * 0.5), 300);
          let kettlebellSwingWeight = Math.min(roundToNearest5(currentMax * 0.4), 53);

          accessoryRoutine += "<ul>";
          accessoryRoutine += `<li>Romanian Deadlifts: 3 sets of 8 reps with ${romanianDeadliftWeight} ${weightUnit}</li>`;
          accessoryRoutine += `<li>Hip Thrusts: 3 sets of 10 reps with ${hipThrustWeight} ${weightUnit}</li>`;
          accessoryRoutine += `<li>Kettlebell Swings: 3 sets of 15 reps with ${kettlebellSwingWeight} ${weightUnit}</li>`;
          accessoryRoutine += "<li>Core Work: 3 sets of 10 reps (Hanging Leg Raises or Ab Wheel Rollouts)</li>";
          accessoryRoutine += "<li>Mobility Work: <ul>";
          accessoryRoutine += "<li>Hip Mobility Drills: 2 sets of 10 reps per leg (Hip Circles, Leg Swings)</li>";
          accessoryRoutine += "<li>Hamstring Stretching: 2 sets of 30 seconds per side (Standing Toe Touch)</li>";
          accessoryRoutine += "<li>Thoracic Spine Mobility: 2 sets of 10 reps (Cat-Cow Stretch, Thoracic Rotations)</li>";
          accessoryRoutine += "</ul></li>";
        }
        routine += accessoryRoutine + "</ul>";
      }
    }
    routine += `</ul>`;
  }

  // Calculate estimated new max
  let estimatedNewMax;
  switch (experience) {
    case "beginner":
      estimatedNewMax = currentMax * 1.05; // 5% increase for beginners
      break;
    case "intermediate":
      estimatedNewMax = currentMax * 1.04; // 4% increase for intermediates
      break;
    case "advanced":
      estimatedNewMax = currentMax * 1.03; // 3% increase for advanced
      break;
  }

  estimatedNewMax = roundToNearest5(estimatedNewMax);
  estimatedMaxElement.innerHTML = `Estimated new 1RM after 1 month: ${estimatedNewMax} ${weightUnit}`;

  routineElement.innerHTML = routine;

  // Add form tips
  let formTips = "";
  if (type === 'squat') {
    formTips = "<h4>Squat Form Tips:</h4><ul><li>Keep your chest up and core tight</li><li>Push your knees out as you descend</li><li>Go to at least parallel depth</li><li>Drive through your heels on the way up</li></ul>";
  } else if (type === 'bench') {
    formTips = "<h4>Bench Press Form Tips:</h4><ul><li>Keep your feet flat on the ground</li><li>Maintain a slight arch in your lower back</li><li>Lower the bar to your mid-chest</li><li>Keep your wrists straight and elbows at about a 45-degree angle to your torso</li></ul>";
  } else if (type === 'deadlift') {
    formTips = "<h4>Deadlift Form Tips:</h4><ul><li>Keep your back straight and core tight</li><li>Push through your heels and keep the bar close to your body</li><li>Engage your lats to keep the bar close</li><li>Finish the lift by squeezing your glutes</li></ul>";
  }
  formTipsElement.innerHTML = formTips;
}

// Event listeners for navigation and initial display
document.addEventListener('DOMContentLoaded', function() {
    showCalculator('squat'); // Show squat calculator by default
    updateWeightUnit(); // Set initial weight unit
    
    document.getElementById('navSquat').addEventListener('click', function() {
        showCalculator('squat');
    });
    document.getElementById('navBench').addEventListener('click', function() {
        showCalculator('bench');
    });
    document.getElementById('navDeadlift').addEventListener('click', function() {
        showCalculator('deadlift');
    });

    document.getElementById('weightUnit').addEventListener('change', updateWeightUnit);
});
