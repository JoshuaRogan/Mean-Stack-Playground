/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import fsp from 'fs-promise'; 
import ProgressBar from 'progress'; 

import Thing from '../api/thing/thing.model';
import Player from '../api/player/player.model';
import Statistic from '../api/statistic/statistic.model';


const JSON_DIR = './data/json/03-19-16/';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

Player.find({}).remove().then(() =>{seedPlayers()});
let filesCount = 0;
let finished = 0; 
let allPlayers = [];
let bar;

function seedPlayers(){
  console.log("Seeding Players from JSON Files!");

  getJSONFiles(JSON_DIR)
    .then(files => {
      parseJSONFiles(files)
        .then(() => {
          console.log('Adding the players to the database'); 
          Player.create(allPlayers)
            .then(() => console.log(`Finished seeding ${allPlayers.length} players and their stats to the database`))
            .catch(console.trace);          
        })
        .catch(console.trace);
    })
    .catch(console.trace); 
}

function updateLog(msg = ''){
  finished++;
  bar.tick();
}

function getJSONFiles(dir){
  return fsp.readdir(dir)
    .then((files) => {
      filesCount = files.length; 
      bar = new ProgressBar('Reading JSON Files :bar :percent', { total: filesCount });
      return files.map(file => {return `${dir}${file}`})
    })
    .catch(console.trace);
}

/**
 * Parse out the JSON files for players 
 * @param  {[type]} files [description]
 * @return {[type]}       [description]
 */
function parseJSONFiles(files){
  let promises = [];
  let max = files.length;
  for(let i=0; i < files.length && i < max; i++){
    let filename = files[i];
    if(filename.includes('.json')){
      let promise = parseJSON(filename)
        .then(createPlayer)
        .catch(console.trace);
      promises.push(promise);
    }
  }
  return Promise.all(promises);
}

/**
 * Parse the JSON of a 
 * @param  {[type]} filePath [description]
 * @return {[type]}          [description]
 */
function parseJSON(filePath){
  return fsp.readFile(filePath)
    .then(contents => {
      return JSON.parse(contents)
    })
    .catch(console.trace); 
}

function getJSON(filePath){
  return fsp.readFile(filePath)
    .then(contents => {
      return contents;
    })
    .catch(console.trace); 
}

function createPlayer(json){
  let player = {};
  player.name = json.name || json.bio.name; 
  player.key = json.id || json.jsonLocation; 
  player.team = json.team || json.bio.team;
  player.type = json.type || json.bio.position;
  player.weight = json.bio.weight; 
  player.slug = (player.name + '-' + player.team).replace(' ', '');
  player.yearlyStats = [];
  addStats(player, json);
  allPlayers.push(player);
  updateLog(player.slug);  
  return Promise.resolve(player); 
}

function addStats(player, json){
  for(let group in json.stats){
    addGroup(player, json, group);
  }
}

function addGroup(player, json, key){
  if(!json.stats[key]) return false; 
  let array = json.stats[key];
  let stats = getYearStats(array, key); 
  player.yearlyStats.push(...stats);
}

function getYearStats(statsArray, groupName){
  let stats = [];

  for(let yearStats of statsArray){
    let year = yearStats.Year;
    delete yearStats.Year;
    for(let statKey in yearStats){ 
      let stat = {};
      stat.name = statKey;
      stat.value = yearStats[statKey];
      stat.group = groupName;
      stat.year = year;
      stats.push(stat);      
    }
  }

  return stats; 
}
