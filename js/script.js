const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
};

const opt = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: '5',
  cloudClassPrefix: 'tag-size-',
  authorListSelector: '.list.authors'
};

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

function generateTitleLinks(customSelector = ''){
  console.log('Generating title links');

  /* remove contents of titleList */
  const titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  
  let html = '';

  for (let article of articles){
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags){
  const params = {
    max: 0, 
    min: 999999,
  };
  for (let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else if(tags[tag] < params.min){
      params.min = tags[tag];      
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
  return opt.cloudClassPrefix + classNumber;
}
function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opt.articleTagsSelector);  
    /* make html variable with empty string */
    let html = '';
    
    const tags = article.getAttribute('data-tags').split(' ');
    console.log('tags:', tags);

    /* START LOOP: for each tag */
    for (let tag of tags){

      /* generate HTML of the link */
      const tagHTMLData = {tag: tag};
      const tagHTML = templates.tagLink(tagHTMLData);
      // const tagHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';

      /* add generated code to html variable */
      html = html + tagHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
  const tagList = document.querySelector(opt.tagsListSelector);
  
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  const allTagsData = {tags: []};

  for(let tag in allTags){
    // allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '"><span>' + tag + ' </span></a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    console.log('allTagsData', allTagsData);
  }
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const articles = document.querySelectorAll(opt.articleSelector);
  let allAuthors = {};


  /* for each article: */
  for (let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(opt.articleAuthorSelector);

    let html = '';

    const author = article.getAttribute('data-author');
    console.log('Author:', author);
    
    const authorHTMLData = {author: author};
    const authorHTML = templates.authorLink(authorHTMLData);
    /* generate new html */
    html = html + authorHTML;

    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
       
    authorWrapper.innerHTML = html; 
  }
  const authorList = document.querySelector(opt.authorListSelector);
  let allAuthorsData = {authors: []};
  console.log('allauthors:', allAuthors);

  for (let author in allAuthors){
    // allAuthorsHTML += '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ') </span></a></li>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log('allAuthorsData:', allAuthorsData);
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
  console.log('authorlinks', authorLinks);
  for (let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();