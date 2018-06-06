import footService from './footService';

function editScores(state, scores) {
    footService.addScores(scores);
    let matchs = state.matchs.map((match, index) => {
        const score = findScore(scores, match.name);
        if (score) {
            return {...match, result: score.result };
        }
        return match;
    });
    return {...state, matchs};
}

function findMatch(matchs, name) {
    if(!matchs) {
        return undefined;
    }
    const match =  matchs.filter((m) => m.name === name);
    return match.length > 0 ? match[0] : undefined;
}

function findScore(scores, name) {
    const score = scores.filter((score) => score.name === name);
    return score.length > 0 ? score[0] : undefined;
}


function updateMatchs(state, matchs) {
    return {...state, matchs: matchs };
}


function setGroups(state, groups) {
    return {...state, groups: groups };
}


function setTeams(state, teams) {
    return {...state, teams: teams };
}


export default {
    editScores,
    updateMatchs,
    findMatch,
    setGroups,
    setTeams
}