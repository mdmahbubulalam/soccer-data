document.getElementById('searchBtn').addEventListener('click', () => {
    document.getElementById('tableDiv').style.display='none';
    const inputText = document.getElementById('searchInput').value;
    const teamUrl = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
    const playerUrl = `https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${inputText}`
    Promise.all([
            fetch(teamUrl)
            .then(resTeam => resTeam.json()),
            fetch(playerUrl)
            .then(resPlayer => resPlayer.json())
        ])
        .then(data => displayResult(data[0].teams, data[1].player))
})

const displayResult = (teams, player) => {
    const searchResult = document.getElementById('searchResult');
    if (teams) {
        teams.forEach(teamsElement => {
            if (teamsElement.strSport == 'Soccer') {
                console.log(teamsElement);
                const teamsDiv = document.createElement('div');
                if (teamsElement.strTeamFanart3) {
                    teamsDiv.innerHTML = `
                    <div class="card-deck">
                        <div class="card card-border">   
                            <div class="card-image-background">
                                <img class="w-100 card-img-top img-fluid" src="${teamsElement.strTeamFanart3}" alt="Card image cap"> 
                            </div>                 
                            <div class="card-body card-text-background" onclick="teamDetails('${teamsElement.idTeam}')">
                                <h5 class="card-title">${teamsElement.strTeam}</h5>
                            </div>
                        </div>
                    </div>
                `
                } else if (teamsElement.strTeamFanart3 == null) {
                    teamsDiv.innerHTML = `
                    <div class="card-deck">
                        <div class="card card-border">
                            <div class="card-header">
                                <img class=" card-img-top img-fluid" src="image/no-image-available-w.jpeg" alt="Card image cap">
                            </div>
                            <div class="card-body card-text-background" onclick="teamDetails('${teamsElement.idTeam}')">
                                <h5 class="card-title">${teamsElement.strTeam}</h5>
                            </div>
                        </div>
                    </div>
                `
                }

                searchResult.appendChild(teamsDiv);
            }
        });

    } else if (player) {
        player.forEach(playerElement => {

            if (playerElement.strSport == 'Soccer') {
                console.log(playerElement);
                const playerDiv = document.createElement('div');
                if (playerElement.strThumb) {
                    playerDiv.innerHTML = `
                    <div class="card-deck">
                        <div class="card card-border">
                            <div class="card-image-background">
                                <img class="card-img-top img-fluid" src="${playerElement.strThumb}" alt="Card image cap">
                            </div>
                            <div class="card-body card-text-background" onclick="playerDetails('${playerElement.idPlayer}')">
                                <h5 class="card-title">${playerElement.strPlayer}</h5>
                            </div>
                        </div>
                    </div>

                `
                } else if (playerElement.strThumb == null) {
                    playerDiv.innerHTML = `
                    <div class="card-deck">
                        <div class="card card-border">
                            <div>
                                <img class="card-img-top img-fluid" src="image/no-image-available.jpeg" alt="Card image cap">
                            </div>
                            <div class="card-body card-text-background" onclick="playerDetails('${playerElement.idPlayer}')">
                                <h5 class="card-title">${playerElement.strPlayer}</h5>
                            </div>
                        </div>
                    </div>
                `
                }

                searchResult.appendChild(playerDiv);
            }
        });
    }
}

const teamDetails = (teamId) => {
    const teamUrl = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(teamUrl)
        .then(resTeam => resTeam.json())
        .then(teamData => displayTeamDetails(teamData.teams[0]))
}

const playerDetails = (playerId) => {
    const playerUrl = `https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerId}`
    fetch(playerUrl)
        .then(resPlayer => resPlayer.json())
        .then(playerData => displayPlayerDetails(playerData.players[0]))
}

const displayPlayerDetails=(player)=>{
    const searchResultDetails = document.getElementById('searchResultDetails');
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML='';
    searchResultDetails.innerHTML = `
    <div class='d-flex justify-content-center'>
        <img class="w-50 img-fluid rounded" src="${player.strThumb}" alt="">
    </div>
    <div class='d-flex justify-content-center'>
        <div>
            <p class="text-white mt-2"><b>Player Name : </b>${player.strPlayer}</p>
            <p class="text-white"><b>Nationality : </b>${player.strNationality}</p>
            <p class="text-white"><b>Birth Day : </b>${player.dateBorn}</p>
            <p class="text-white"><b>Birth Day Location : </b>${player.strBirthLocation}</p>
            <p class="text-white"><b>Team : </b>${player.strTeam}</p>
            <p class="text-white"><b>Kit Number : </b>${player.strNumber}</p>
            <p class="text-white"><b>Kit : </b>${player.strKit}</p>
            <p class="text-white"><b>Position : </b>${player.strPosition}</p>
            <p class="text-white"><b>Foot: </b>${player.strSide}</p>
            <p class="text-white"><b>Height: </b>${player.strHeight}</p>
            <p class="text-white"><b>Weight : </b>${player.strWeight}</p>
            <p class="text-white"><b>Date Signed : </b>${player.dateSigned}</p>
            <p class="text-white"><b>Signing : </b>${player.strSigning}</p>
            <p class="text-white"><b>Wage : </b>${player.strWage}</p>
            <p class="text-white"><b>Description : </b>${player.strDescriptionEN}</p>
            <p class="text-white"><b>Gallery : </b></p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-2 g-2 d-flex justify-content-center">
        <a href="${player.strThumb}" target="_black"><img class="img-fluid rounded" src="${player.strThumb}" alt=""></a>
        <a href="${player.strCutout}" target="_black"><img class="img-fluid rounded" src="${player.strCutout}" alt=""></a>
        <a href="${player.strRender}" target="_black"><img class="img-fluid rounded" src="${player.strRender}" alt=""></a>   
        <a href="${player.strFanart1}" target="_black"><img class="img-fluid rounded" src="${player.strFanart1}" alt=""></a>
        <a href="${player.strFanart2}" target="_black"><img class="img-fluid rounded" src="${player.strFanart2}" alt=""></a>
        <a href="${player.strFanart3}" target="_black"><img class="img-fluid rounded" src="${player.strFanart3}" alt=""></a>
        <a href="${player.strFanart4}" target="_black"><img class="img-fluid rounded" src="${player.strFanart4}" alt=""></a>
    </div>
    `

}


const displayTeamDetails = (team) => {
    const searchResultDetails = document.getElementById('searchResultDetails');
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = '';
    //searchResultDetails.style.backgroundImage = `${team.strStadium}`;
    searchResultDetails.innerHTML = `
    <div class='d-flex justify-content-center'>
        <img class="w-50 img-fluid rounded" src="${team.strTeamBadge}" alt="">
    </div>
    <div class='d-flex justify-content-center'>
        <div>
            <p class="text-white mt-2"><b>Team Name : </b>${team.strTeam}</p>
            <p class="text-white"><b>Country : </b>${team.strCountry}</p>
            <p class="text-white"><b>League : </b>${team.strLeague}</p>
            <p class="text-white"><b>Founded Year : </b>${team.intFormedYear}</p>
            <p class="text-white"><b>Ground : </b>${team.strStadium}</p>
            <p class="text-white"><b>Ground Location: </b>${team.strStadiumLocation}</p>
            <p class="text-white"><b>Ground Capacity: </b>${team.intStadiumCapacity}</p>
            <p class="text-white"><b>Description : </b>${team.strDescriptionEN}</p>
            <p class="text-white"><b>Team Jersey : </b></p>
            <img class="img-fluid rounded" src="${team.strTeamJersey}" alt="">
            <p class="text-white"><b>Team Banner : </b></p>
            <img class="img-fluid rounded" src="${team.strTeamBanner}" alt="">
            <p class="text-white"><b>Team Logo : </b></p>
            <img class="img-fluid rounded" src="${team.strTeamLogo}" alt="">
            <p class="text-white"><b>Gallery : </b></p>
        </div>
    </div>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-2 g-2 d-flex justify-content-center">
        <a href="${team.strTeamFanart1}" target="_black"><img class="img-fluid rounded" src="${team.strTeamFanart1}" alt=""></a>
        <a href="${team.strTeamFanart2}" target="_black"><img class="img-fluid rounded" src="${team.strTeamFanart2}" alt=""></a>
        <a href="${team.strTeamFanart3}" target="_black"><img class="img-fluid rounded" src="${team.strTeamFanart3}" alt=""></a>   
        <a href="${team.strTeamFanart4}" target="_black"><img class="img-fluid rounded" src="${team.strTeamFanart4}" alt=""></a>
    </div>
    `
}


const leagueId = {
    epl: 4328,
    efl: 4329,
    efllOne: 4396,
    efllTwo: 4397,
    laLiga: 4335,
    laLigaTwo: 4400,
    bundesliga: 4331,
    bundesligaTwo: 4399,
    bundesligaThree: 4639,
    serieA: 4332,
    serieB: 4394,
    serieC: 4398,
    leagueOne: 4334,
    leagueTwo: 4401,
}


const eplUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.epl}&s=2020-2021`;
const eflUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.efl}&s=2020-2021`;
const efllOneUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.efllOne}&s=2020-2021`;
const efllTwoUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.efllTwo}&s=2020-2021`;

const laLigaUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.laLiga}&s=2020-2021`;
const laLigaTwoUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.laLigaTwo}&s=2020-2021`;

const bundesligaUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.bundesliga}&s=2020-2021`;
const bundesligaTwoUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.bundesligaTwo}&s=2020-2021`;
const bundesligaThreeUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.bundesligaThree}&s=2020-2021`;

const serieaUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.serieA}&s=2020-2021`;
const seriebUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.serieB}&s=2020-2021`;
const seriecUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.serieC}&s=2020-2021`;

const leagueOneUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.leagueOne}&s=2020-2021`;
const leagueTwoUrl = `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId.leagueTwo}&s=2020-2021`;

Promise.all([
        fetch(eplUrl)
        .then(resEpl => resEpl.json()),
        fetch(eflUrl)
        .then(resEfl => resEfl.json()),
        fetch(efllOneUrl)
        .then(resEfllOne => resEfllOne.json()),
        fetch(efllTwoUrl)
        .then(resEfllTwo => resEfllTwo.json()),

        fetch(laLigaUrl)
        .then(reslaLiga => reslaLiga.json()),
        fetch(laLigaTwoUrl)
        .then(reslaLigaTwo => reslaLigaTwo.json()),

        fetch(bundesligaUrl)
        .then(resbundesliga => resbundesliga.json()),
        fetch(bundesligaTwoUrl)
        .then(resbundesligaTwo => resbundesligaTwo.json()),
        fetch(bundesligaThreeUrl)
        .then(resbundesligaThree => resbundesligaThree.json()),

        fetch(serieaUrl)
        .then(resserieA => resserieA.json()),
        fetch(seriebUrl)
        .then(resserieB => resserieB.json()),
        fetch(seriecUrl)
        .then(resserieC => resserieC.json()),

        fetch(leagueOneUrl)
        .then(resleagueOne => resleagueOne.json()),
        fetch(leagueTwoUrl)
        .then(resleagueTwo => resleagueTwo.json()),
    ])

    .then(data => displayLeagueTable(data[0].table, data[1].table, data[2].table, data[3].table, data[4].table, data[5].table, data[6].table, data[7].table, data[8].table, data[9].table, data[10].table, data[11].table, data[12].table, data[13].table));

const displayLeagueTable = (epl, efl, efllOne, efllTwo, laLiga, laLigaTwo, bundesliga, bundesligaTwo, bundesligaThree, serieA, serieB, serieC, leagueOne, leagueTwo) => {

    document.getElementById('epl').addEventListener('click', () => {
        epl.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('efl').addEventListener('click', () => {
        efl.forEach(tableElement => {
            tableData(tableElement);
        }) 
    })

    document.getElementById('efllOne').addEventListener('click', () => {
        efllOne.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('efllTwo').addEventListener('click', () => {
        efllTwo.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('laLiga').addEventListener('click', () => {
        laLiga.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('laLigaTwo').addEventListener('click', () => {
        laLigaTwo.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('bundesliga').addEventListener('click', () => {
        bundesliga.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('bundesligaTwo').addEventListener('click', () => {
        bundesligaTwo.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('bundesligaThree').addEventListener('click', () => {
        bundesligaThree.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('serieA').addEventListener('click', () => {
        serieA.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('serieB').addEventListener('click', () => {
        serieB.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('serieC').addEventListener('click', () => {
        serieC.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('leagueOne').addEventListener('click', () => {
        leagueOne.forEach(tableElement => {
            tableData(tableElement);
        })
    })

    document.getElementById('leagueTwo').addEventListener('click', () => {
        leagueTwo.forEach(tableElement => {
            tableData(tableElement);
        })
    })


}

function tableData(tableElement) {
    document.getElementById('tableDiv').style.display='block';
    const leagueTable = document.getElementById('leagueTable');
    const displayTableTr = document.createElement('tr');
    displayTableTr.innerHTML = `
        <th scope="row">${tableElement.intRank}</th>
        <td><img src="${tableElement.strTeamBadge}" class='img-fluid' alt=""> ${tableElement.strTeam}</td>
        <td>${tableElement.intPlayed}</td>
        <td>${tableElement.intWin}</td>
        <td>${tableElement.intDraw}</td>
        <td>${tableElement.intLoss}</td>
        <td>${tableElement.intGoalsFor}</td>
        <td>${tableElement.intGoalsAgainst}</td>
        <td>${tableElement.intGoalDifference}</td>
        <td>${tableElement.intPoints}</td>  
`
    leagueTable.appendChild(displayTableTr);
    
    

}