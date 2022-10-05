const limitPerPage=20;
const apiUrl="https://5b5cb0546a725000148a67ab.mockapi.io/api/v1/users";

const getUsers = async function(pageNo = 1) {

let actualUrl=apiUrl + `?page=${pageNo}&limit=${limitPerPage}`;
var apiResults=await fetch(actualUrl)
.then(resp=>{
return resp.json();
});

return apiResults;

}

const getEntireUserList = async function(pageNo = 1) {
  const results = await getUsers(pageNo);
  console.log("Retreiving data from API for page : " + pageNo);
  if (results.length>0) {
    return results.concat(await getEntireUserList(pageNo+1));
  } else {
    return results;
  }
};


(async ()=>{

    const entireList=await getEntireUserList();
    console.log(entireList);

})();
