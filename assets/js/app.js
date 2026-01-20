function filterCars(){
 let q=document.getElementById('search').value.toLowerCase();
 document.querySelectorAll('.card').forEach(c=>{
  c.style.display=c.dataset.name.includes(q)?'block':'none';
 });
}
