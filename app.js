const app = {
  urlArr: ['./data.1.json', './data.2.json', './data.3.json', './data.4.json', './data.5.json'],
  async getData(url) {
    try {
      const data = await fetch(url)
      return data.json();
    } catch (error) {
      console.error(error);
    }
  },
  createDivs(arr) {
    let strWithDivs = '';
    for (let i = 0; i < arr.length; i++) {
      const div = document.createElement('div');
      div.classList.add('boxes');
      div.style.height = `${(arr[i] * 10) - 1}%`;
      div.style.width = `${Math.floor(100 / arr.length) - 5}%`;
      div.style.backgroundColor = this.getRandomColor();
      strWithDivs += div.outerHTML;
    }

    document.getElementById('boxWrapper').insertAdjacentHTML('beforeend', strWithDivs);
  },
  getRandomIndex() {
    return Math.floor(Math.random() * ((this.urlArr.length - 1) - 0 + 1)) + 0
  },
  getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
  addEventListeners(arr) {
    const boxesArr = document.getElementsByClassName('boxes');
    for (let i = 0; i < boxesArr.length; i++) {
      boxesArr[i].addEventListener('mouseover', () => {
        document.getElementById('headerText').innerHTML = `${arr[i] * 10}%`;
      })

      boxesArr[i].addEventListener('mouseleave', () => {
        document.getElementById('headerText').innerHTML = '';
      })
    }
  },
  events() {},
  async oraganizeData() {
    const jsonFile = this.urlArr[this.getRandomIndex()];
    const resp = await this.getData(jsonFile);
    const arr = JSON.parse(resp.data);
    this.createDivs(arr);
    this.addEventListeners(arr);
  },
};

app.oraganizeData();