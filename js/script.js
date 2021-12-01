const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log('event:', event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');


  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
    
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){
  console.log('Generating title links');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  
  let html = '';

  for (let article of articles){
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('article links:', linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  // titleList.insertAdjacentHTML('beforeend', html);
  console.log('title links:', html);
  
  const links = document.querySelectorAll('.titles a');


  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);  
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    /* split tags into array */
    const tags = article.getAttribute('data-tags').split(' ');
    console.log('tags:', tags);

    /* START LOOP: for each tag */
    for (let tag of tags){

      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  } 
}

generateTags();

function tagClickHandler(event){
  console.log('Tag was clicked');
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log('clicked tag href:', href);
  const tag = href.replace('#tag-', '');  
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  
  for (let activeTag of activeTags){  
    activeTag.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){  
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('[href^="#tag-"]');
  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
  /* add tagClickHandler as event listener for that link */

    /* END LOOP: for each link */
    tagLink.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* for each article: */
  for (let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* create variable with empty html */
    let html = '';
    /* get author from data-author */
    const author = article.getAttribute('data-author');
    console.log('Author:', author);
      
    /* generate new html */
    const authorHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
    html = html + authorHTML;
    console.log('authorHTML:', authorHTML);
  
    /* insert html into wrapper */
    authorWrapper.innerHTML = html;
  }

}
generateAuthors();


function authorClickHandler(event){
  console.log('Author was clicked');
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  console.log('clicked author href:', href);
  
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  
  for (let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const authorLinks = document.querySelectorAll('[href="' + href + '"]');
  for (let authorLink of authorLinks){
    authorLink.classList.add('active');
    console.log('added active to:', authorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('[href^="#author-"]');
  console.log('links', authorLinks);
  for (let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();