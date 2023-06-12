function callWriteJSON(jsonData)
{
  // Call the React function from the separate script
  if (typeof window.writeJSON === 'function') {
    window.writeJSON(jsonData); // Call the function defined in the React component
  } else {
    console.error('React function not accessible.');
  }
}

// Function to populate the list with links
var id_counter = 0;

//This class is for long term storage of information about the game that isn't used for initial loading of the game object such as how many times a game has been clicked on
class Game
{
  constructor(id, title, authors, description, genres, controls, supported_controllers, main_image, images, json_src, onclick, date_added, click_count)
  {
    this.id = id;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.genres = genres;
    this.controls = controls;
    this.supported_controllers = supported_controllers;
    this.main_image = main_image;
    this.images = images;
    this.json_src = json_src;
    this.onclick = onclick;
    this.date_added = date_added;
    this.click_count = click_count;
  }

  incrementClickCount()
  {
    this.click_count++;
    console.log(this.toJSON());
    callWriteJSON(this.toJSON());
  }

  toJSON()
  {
    const data = 
    {
      "id": this.id,
      "title": this.title,
      "authors": this.authors,
      "description": this.description,
      "genres": this.genres,
      "controls": this.controls,
      "supported_controllers": this.supported_controllers,
      "main_image": this.main_image,
      "images": this.images,
      "json_src": this.json_src,
      "onclick": this.onclick,
      "date_added": this.date_added,
      "click_count": this.click_count
    };

    return data;
  }
}

var game_list = [];

function getGameByTitle(title)
{
  for(let i = 0; i < game_list.length; i++)
  {
    if(game_list[i].title == title)
    {
      return game_list[i];
    }
  }
  return null;
}

// create a listitem using the json data and add it to the game list
function populateList(jsonData)
{
  const linkList = document.getElementById('game-list');
  const listItem = document.createElement('li');
  const link = document.createElement('a');

  var id = jsonData.id == -1 ? id_counter : jsonData.id;
  var game = new Game(id, jsonData.title, jsonData.authors, jsonData.description, jsonData.genres, jsonData.controls, jsonData.supported_controllers, jsonData.main_image, jsonData.images, jsonData.json_src, jsonData.onclick, jsonData.date_added, jsonData.click_count);
  game_list[id_counter] = game;
  //callWriteJSON(game.toJSON());

  link.href = "#";
  link.textContent = game.title;
  link.onclick = () => eval(game.onclick);
  link.classList.add("section");
  link.id = game.id.toString();
  
  id_counter++;
  
  listItem.appendChild(link);
  linkList.appendChild(listItem);
}

// Folder path where the JSON files are located
const folderPath = 'jsons/';

// Function to fetch the list of JSON files
function fetchJsonFiles()
{
  return fetch(folderPath)
    .then(response => response.text())
    .then(html =>
    {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = doc.querySelectorAll('a');
      const jsonFiles = Array.from(links)
        .map(link => link.href)
        .filter(href => href.endsWith('.json'))
        .map(href => href.replace(window.location.href, ''));
      
      return jsonFiles;
    });
}

// Function to fetch and populate the list
function fetchAndPopulateList()
{
  fetchJsonFiles()
    .then(jsonFiles =>
    {
      jsonFiles.forEach(file =>
      {
        fetch(file)
          .then(response => response.json())
          .then(jsonData => populateList(jsonData))
          .catch(error => console.error(`Error fetching JSON file: ${file}`, error));
      });
    })
    .catch(error => console.error('Error fetching JSON files', error));
}

// Call the fetchAndPopulateList function to initiate the process
fetchAndPopulateList();

console.log(game_list);