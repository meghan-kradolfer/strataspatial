const data = {
  "loaded": false,
  "views" : [
      {
        name: "About",
        link: "about.html"
      }
    ],
  "posts": []
};

const SPACE_ID = 'gjpem8dtmmqc';
const ACCESS_TOKEN = '480f6c5e51771adf43bd6f6941398d1614295fdcee72a6a6ee0712aab4da33ee';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function fetchEntriesForContentType (contentType) {
  return client.getEntries({
      content_type: contentType
    })
  .then((response) => response.items)
  .catch((error) => {
    console.error(error)
  })
}

function displayEntries(contentType) {
  return fetchEntriesForContentType(contentType)
    .then((entries) => {
      entries.forEach((entry) => {
        data.posts.push(entry.fields);
        data.loaded = true;
      });

    })
}

displayEntries("blogPost");

function checkData() {
    if (!data.loaded) {
        setTimeout("checkData();", 1000);
        return false;
    } else {
      console.log(data);

      // Navigation
      const nav_template = $("#nav_template").html();
      $("#nav").html(Mustache.render(nav_template, data));

      // Blog Posts
      const posts_template = $("#posts_template").html();
      $("#posts").html(Mustache.render(posts_template, data));

    }
}