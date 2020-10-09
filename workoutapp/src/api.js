let header = {};
const token = '';

let headerOptions = {
  "Content-Type": "application/json",
  token: window.localStorage.getItem("token"),
};

export function updateHeaderOptions() {
  console.log("updating token for API requests"); //called on login

  headerOptions = {
    "Content-Type": "application/json",
    token: window.localStorage.getItem("token"),
  };
}

export function setToken(token) {
      header = {     
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
}

//get exercises
export async function getExercises() {
    const result = await fetch("/api/exercises", {
        headers: headerOptions,
    });
    const data = await result.json()

    return data
}

//get workouts
export async function getWorkouts() {
    const result = await fetch("/api/workouts", {
        headers: headerOptions,
    });
    const data = await result.json()
    console.log("workout data api", data)
    return data
}


//add workout
export async function addWorkout(workoutDetails) {
  console.log('workout detail', workoutDetails)
    const result = await fetch("/api/workouts/new", {
      method: "POST",
      body: JSON.stringify(workoutDetails),
      headers: headerOptions,
    });
    const data = await result.json();
  
    return data;
  }


  //add exercise to workout
export async function addExerciseToWorkout(exerciseDetails) {
    const result = await fetch("/api/workouts/exercises/add", {
      method: "POST",
      body: JSON.stringify(exerciseDetails),
      headers: headerOptions,
    });
    const data = await result.json();
  
    return data;
  }

//get individual workouts
export async function getWorkout(id) {
    const result = await fetch(`/api/workouts/${id}`, {
        headers: headerOptions,
    });
    const data = await result.json()
    console.log("workout data api", data)
    return data
}

//bookmark workout
export async function bookmarkWorkout (workoutId){
  const result = await fetch(`/api/workouts/bookmark/${workoutId}/true`, {
    method: "PATCH",  
    headers: headerOptions
  });
  const data = await result.json()
  console.log("bookmark workout", data)
  return data
}

//get bookmarked workouts
export async function savedWorkouts (){
  console.log('api hit')
  const result = await fetch('/api/workouts/saved', {
    headers: headerOptions
  });
  const data = await result.json()
  console.log("bookmarked workouts", data)
  return data
}

//add exercise
export async function addExercise(exerciseDetails) {
    const result = await fetch("/api/exercises/new", {
      method: "POST",
      body: JSON.stringify(exerciseDetails),
      headers: headerOptions,
    });
    const data = await result.json();
  
    return data;
  }

//get profile info
export async function getProfile() {
    const result = await fetch("/api/user/profile", {
        headers: headerOptions,
    });
    const data = await result.json()
    console.log("user data api", data)
    return data
}

//edit profile info
export async function updateProfile(profileDetails) {
  console.log({profileDetails})
    const result = await fetch(`/api/user/profile/update`, {
      method: "PATCH",  
      headers: headerOptions,
      body: JSON.stringify(profileDetails),
    });
    const data = await result.json()
    console.log("user prof updated data api", data)
    return data
}

//create user
export async function createAccount(userDetails) {
    const result = await fetch("/api/user/new", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headerOptions,
    });
    if (result.status > 299) {
      return Promise.reject("Invalid")
    } else {
      return Promise.resolve("New user");
    }
  }


//log in
export async function login(userDetails) {
  console.log("user deets", userDetails)
    const result = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: headerOptions,
    });
    console.log(result);

    if (result.status > 299) {
      return Promise.reject("invalid login");
    }
    // console.log(result)
    console.log(result.headers.get("token"))
    return result.headers.get("token");
  }