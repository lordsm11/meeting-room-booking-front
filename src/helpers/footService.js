import axios from 'axios';

const footServiceUrl = "http://localhost:9123/foot/";

function getMatchsByTeam(team) {
    return axios.get(footServiceUrl+'match/team/'+team);
}

function getMatchsByGroup(group) {
    return axios.get(footServiceUrl+'match/group/'+group);
}

function getMatchs() {
    axios.get(footServiceUrl+'match');
}

function addScores(matchs) {
    return axios.post(footServiceUrl+'match/score', matchs);
}

function getTeams() {
    return axios.get(footServiceUrl+'teams');
}

function getGroups() {
    return axios.get(footServiceUrl+'groups');
}

export default {
    getMatchsByTeam,
    getMatchsByGroup,
    getMatchs,
    addScores,
    getTeams,
    getGroups
}