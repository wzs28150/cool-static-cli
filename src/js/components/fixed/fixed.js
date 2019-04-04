import Headroom from 'headroom';
const fixed = () => {
  var myElement = document.querySelector(".page-right");
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement, {
    "tolerance": 5,
    "offset": $('.page-right ul').offset().top,
    "classes": {
      initial: "",
      // when scrolling up
      pinned: "",
      // when scrolling down
      unpinned: "",
      // when above offset
      top: "",
      // when below offset
      notTop: "fixed",
      // when at bottom of scoll area
      bottom: "fixed",
      // when not at bottom of scroll area
      notBottom: ""
    }
  });
  // initialise
  headroom.init();
};

export default fixed;
