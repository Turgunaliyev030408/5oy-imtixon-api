const darkButton = document.querySelector("#dark");
const body = document.body;

darkButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  const darkMode = body.classList.contains("dark-mode");
  localStorage.setItem("dark", JSON.stringify(darkMode));
  darkButton.style.backgroundColor = darkMode ? "#fff" : "#333";
  darkButton.style.color = darkMode ? "#333" : "#fff";
});

const apiKey = "65cb397a56458e21677c58c4";
const apiUrl = "https://dummyapi.io/data/v1/post";

async function getPosts() {
  try {
    let response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "app-id": apiKey,
      },
    });

    if (response.ok) {
      let posts = await response.json();
      renderPosts(posts.data);
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
function renderPosts(posts) {
  let container = document.getElementById("posts-container");
  container.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];
    let postElement = document.createElement("div");
    postElement.className = "bg-white p-4 mb-4 shadow rounded";
    postElement.innerHTML =
      "<img class=' h-60 w-full object-cover  p-0' src='" +
      post.image +
      "' alt='beautiful image'" +
      post.image +
      "' class=' my-4 w-full rounded'>" +
      "<h2 class='text-xl font-bold text-black'>" +
      post.text +
      "</h2>" +
      "<p class='text-gray-600' >" +
      post.owner.firstName +
      " " +
      post.owner.lastName +
      "</p>" +
     " <a href='details.html?id=${post.id}' class='text-blue-500'  > View Details</a>" + "<br>" +
      "<button onclick='deletePost(\"" +
      post.id +
      "\")' class=' mt-2 px-4 py-2 bg-red-500 text-white rounded'>Delete</button>";
    container.appendChild(postElement);
  }
}
async function deletePost(postId) {
  try {
    let response = await fetch(apiUrl + "/" + postId, {
      method: "DELETE",
      headers: {
        "app-id": apiKey,
      },
    });

    if (response.ok) {
      getPosts();
    } else {
      console.error("Failed to delete post");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
getPosts();
