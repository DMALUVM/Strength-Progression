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

  document.getElementById(`${type}Container`).style.display = 'block';
  document.getElementById(`nav${type.charAt(0).toUpperCase() + type.slice(1)}`).classList.add('active');
}

function calculateRoutine(type) {
  const currentMax = parseFloat(document.getElementById(`currentMax${type.charAt(0).toUpperCase() + type.slice(1)}`).value);
  const workoutDays = parseInt(document.getElementById(`workoutDays${type.charAt(0).toUpperCase() + type.slice(1)}`).value);
  const experience = document.getElementById(`experience${type.charAt(0).toUpperCase() + type.slice(1)}`).value;
  const includeAccessory = document.getElementById(`includeAccessory${type.charAt(0).toUpperCase() + type.slice(1)}`).value === "yes";
  const routineElement = document.getElementById(`workoutRoutine${type.charAt(0).toUpperCase() + type.slice(1)}`);
  const estimatedMaxElement = document.getElementById(`estimatedMax${type.charAt(0).toUpperCase() + type.slice(1)}`);

  if (isNaN(currentMax) || isNaN(workoutDays)) {
    alert("Please enter valid numbers for Current Max and Workout Days");
    return;
  }

  const routine = generatePeriodizedRoutine(type, currentMax, workoutDays, experience);
  const accessoryWork = includeAccessory ? generateAccessoryWork(type, experience) : '';
  const estimatedNewMax = calculateEstimatedNewMax(currentMax, experience);

  routineElement.innerHTML = routine + accessoryWork;
  estimatedMaxElement.innerHTML = `Estimated new 1RM after 9 weeks: ${estimatedNewMax} lbs`;
}

function generatePeriodizedRoutine(type, currentMax, workoutDays, experience) {
  const phases = [
    { name: 'Hypertrophy', weeks: 3, intensity: 0.7, volumeMultiplier: 1.2 },
    { name: 'Strength', weeks: 3, intensity: 0.85, volumeMultiplier: 1 },
    { name: 'Power', weeks: 2, intensity: 0.9, volumeMultiplier: 0.8 },
    { name: 'Deload', weeks: 1, intensity: 0.6, volumeMultiplier: 0.7 }
  ];
  
  let routine = "";
  let weekCounter = 1;
  
  for (const phase of phases) {
    routine += `<h3>${phase.name} Phase</h3>`;
    for (let week = 1; week <= phase.weeks; week++) {
      routine += generateWeeklyRoutine(type, currentMax, workoutDays, experience, phase, weekCounter);
      weekCounter++;
    }
  }
  
  return routine;
}

function generateWeeklyRoutine(type, currentMax, workoutDays, experience, phase, weekCounter) {
  let weeklyRoutine = `<h4>Week ${weekCounter}</h4><ul>`;
  const exerciseVariation = getExerciseVariation(type, weekCounter);
  
  for (let day = 1; day <= workoutDays; day++) {
    const baseWeight = currentMax * phase.intensity;
    const adjustedWeight = calculateProgressiveOverload(baseWeight, weekCounter, phase);
    const workingSets = getWorkingSets(experience, phase);
    
    weeklyRoutine += `<li>Day ${day}: ${exerciseVariation}<ul>`;
    weeklyRoutine += generateWarmupSets(adjustedWeight);
    weeklyRoutine += `<li>Working sets: ${workingSets.sets} sets of ${workingSets.reps} reps at ${roundToNearest5(adjustedWeight)} lbs</li>`;
    weeklyRoutine += "</ul></li>";
  }
  
  weeklyRoutine += "</ul>";
  return weeklyRoutine;
}

function calculateProgressiveOverload(baseWeight, week, phase) {
  let progression = 0;
  switch (phase.name) {
    case 'Hypertrophy':
      progression = baseWeight * 0.02 * week;
      break;
    case 'Strength':
      progression = baseWeight * 0.015 * week;
      break;
    case 'Power':
      progression = baseWeight * 0.01 * week;
      break;
    case 'Deload':
      progression = -baseWeight * 0.1;
      break;
  }
  return baseWeight + progression;
}

const exerciseVariations = {
  squat: ['Back Squat', 'Front Squat', 'Box Squat', 'Pause Squat'],
  bench: ['Flat Bench Press', 'Incline Bench Press', 'Close-Grip Bench Press', 'Paused Bench Press'],
  deadlift: ['Conventional Deadlift', 'Sumo Deadlift', 'Deficit Deadlift', 'Romanian Deadlift']
};

function getExerciseVariation(type, week) {
  return exerciseVariations[type][week % exerciseVariations[type].length];
}

function generateWarmupSets(workingWeight) {
  const warmupSets = [
    { percentage: 0.5, reps: 5 },
    { percentage: 0.6, reps: 4 },
    { percentage: 0.7, reps: 3 },
    { percentage: 0.8, reps: 2 },
    { percentage: 0.9, reps: 1 }
  ];
  
  let warmup = "<li>Warm-up sets:<ul>";
  for (const set of warmupSets) {
    const weight = roundToNearest5(workingWeight * set.percentage);
    warmup += `<li>${set.reps} reps at ${weight} lbs</li>`;
  }
  warmup += "</ul></li>";
  return warmup;
}

function getWorkingSets(experience, phase) {
  let sets, reps;
  switch (experience) {
    case 'beginner':
      sets = 3;
      reps = phase.name === 'Hypertrophy' ? 8 : 5;
      break;
    case 'intermediate':
      sets = 4;
      reps = phase.name === 'Hypertrophy' ? 8 : 5;
      break;
    case 'advanced':
      sets = 5;
      reps = phase.name === 'Hypertrophy' ? 8 : 3;
      break;
  }
  return { sets, reps };
}

function generateAccessoryWork(type, experience) {
  const accessoryExercises = {
    squat: ['Bulgarian Split Squats', 'Leg Press', 'Hip Thrusts', 'Lunges'],
    bench: ['Dumbbell Press', 'Tricep Extensions', 'Rows', 'Face Pulls'],
    deadlift: ['Good Mornings', 'Pull-ups', 'Farmer's Walks', 'Back Extensions']
  };
  
  let accessoryRoutine = "<h4>Accessory Work</h4><ul>";
  for (const exercise of accessoryExercises[type]) {
    const sets = experience === 'beginner' ? 2 : 3;
    const reps = experience === 'advanced' ? '8-10' : '10-12';
    accessoryRoutine += `<li>${exercise}: ${sets} sets of ${reps} reps</li>`;
  }
  accessoryRoutine += "</ul>";
  return accessoryRoutine;
}

function calculateEstimatedNewMax(currentMax, experience) {
  let increase;
  switch (experience) {
    case 'beginner':
      increase = 0.10; // 10% increase for beginners
      break;
    case 'intermediate':
      increase = 0.07; // 7% increase for intermediates
      break;
    case 'advanced':
      increase = 0.05; // 5% increase for advanced
      break;
  }
  return roundToNearest5(currentMax * (1 + increase));
}

// Call this function when the page loads to show the default calculator
window.onload = function() {
  showCalculator('squat');
};
