function selectAllCheckbox(selectAll) {
  const checkboxes = document.getElementsByClassName('productNo');

  for (let checkbox of checkboxes) {
    checkbox.checked = selectAll.checked;
  }
}

const returnSubmit = () => {

  const form = document.getElementById('returnForm');


  const checkbox = document.getElementsByClassName('productNo');

  for (let i = 0; i < checkbox.length; i++) {

    if (!checkbox[i].checked) {


      checkbox[i].setAttribute('disabled', 'true');

      const amount = document.getElementById('amount' + i);

      amount.setAttribute('disabled', 'true');


    } else {
      console.log(checkbox[i].checked);
    }

  }

  setTimeout(() => {
    form.submit();

  }, "1000");

}