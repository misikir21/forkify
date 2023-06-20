const recipeContainer = document.querySelector('.recipe');
import icons from 'url:../img/icons.svg';


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderspinner=function(parentel){
  const markup=`
  <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> `;
       parentel.innerHTML='';
       parentel.insertAdjacentHTML('afterbegin',markup)
};
// https://forkify-api.herokuapp.com/v2

//////////////////////////////////

const showoneRecipe=async function(){
  try{
    const id=window.location.hash.slice(1);
    // const id=window.location.hash.slice(1);
    renderspinner(recipeContainer);
    if(!id) return;

    const res=await fetch(
 `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`)

  const data=await res.json();
  if(!res.ok) throw new Error(`${data.message} ${res.status}`)
   console.log(res,data)
let {recipe}=data.data;
recipe={
  id:recipe.id,
  tittle:recipe.title,
  puplished:recipe.publisher,
  sourceurl:recipe.source_url,
  servings:recipe.servings,
  cookingtime:recipe.cooking_time,
  ingredints:recipe.ingredients,
  image:recipe.image_url

}
// console.log(recipe,data,res)

const markup=`
<figure class="recipe__fig">
<img src="${recipe.image}" alt="${recipe.tittle}" class="recipe__img" />
<h1 class="recipe__title">
  <span>${recipe.tittle}</span>
</h1>
</figure>

<div class="recipe__details">
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-clock"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingtime}</span>
  <span class="recipe__info-text">minutes</span>
</div>
<div class="recipe__info">
  <svg class="recipe__info-icon">
    <use href="${icons}#icon-users"></use>
  </svg>
  <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
  <span class="recipe__info-text">servings</span>

  <div class="recipe__info-buttons">
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-minus-circle"></use>
      </svg>
    </button>
    <button class="btn--tiny btn--increase-servings">
      <svg>
        <use href="${icons}#icon-plus-circle"></use>
      </svg>
    </button>
  </div>
</div>

<div class="recipe__user-generated">
  <svg>
    <use href="${icons}#icon-user"></use>
  </svg>
</div>
<button class="btn--round">
  <svg class="">
    <use href="${icons}#icon-bookmark-fill"></use>
  </svg>
</button>
</div>

<div class="recipe__ingredients">
<h2 class="heading--2">Recipe ingredients</h2>
<ul class="recipe__ingredient-list">
${recipe.ingredints.map(ing=>{
  return`
  <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ing.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>`;

}).join()
}
</div>

<div class="recipe__directions">
<h2 class="heading--2">How to cook it</h2>
<p class="recipe__directions-text">
  This recipe was carefully designed and tested by
  <span class="recipe__publisher">${recipe.puplished}</span>. Please check out
  directions at their website.
</p>
<a
  class="btn--small recipe__btn"
  href="${recipe.sourceurl}"
  target="_blank"
>
  <span>Directions</span>
  <svg class="search__icon">
    <use href="src/img/icons.svg#icon-arrow-right"></use>
  </svg>
</a>
</div>`;
recipeContainer.innerHTML=''
recipeContainer.insertAdjacentHTML('afterbegin',markup)
}
 catch (err) 
  {
    alert(err)
  }};
  // showoneRecipe()
  // ['haschange','load'].forEach(ev=>window.addEventListener(ev,showoneRecipe))
  window.addEventListener('hashchange',showoneRecipe)
  window.addEventListener('load',showoneRecipe)

