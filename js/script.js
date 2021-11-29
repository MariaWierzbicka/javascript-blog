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
  optTitleListSelector = '.titles';

const generateTitleLinks = function(){
  console.log('Generating title links');

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  const clearTitleList = function(){
    titleList.innerHTML = '';
  };
  clearTitleList();

  const articles = document.querySelectorAll(optArticleSelector);
  
  let html = '';

  for (let article of articles){
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  // titleList.insertAdjacentHTML('beforeend', html);
  console.log(html);
  
  const links = document.querySelectorAll('.titles a');


  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();
