const per_page=25;
const total = 0;
const total_pages = 0;

const apiUrl="https://jsonmock.hackerrank.com/api/transactions/search?userId=4";

const getUsers = async function(num = 1) {

let actualUrl=apiUrl + `?page=${num}&limit=${per_page}}`;
var apiResults=await fetch(actualUrl)
.then(resp=>{
return resp.json();
});

return apiResults;

}

const getEntireUserList = async function(num = 1) {
  const results = await getUsers(num);
  console.log("Retreiving data from API for page : " + num);
  if (results.length>0) {
    return results.concat(await getEntireUserList(num+1));
  } else {
    total_pages +=1;
    total = results.length + total; 
    return results;
  }
};


(async ()=>{

    const entireList=await getEntireUserList();
    console.log(entireList);
    console.log(num);
    console.log(total);
    console.log(total_pages);


})();

