// load all
function loadAll() {
  // $('tbody').empty();
  $.ajax({
      url: "api/students"
    }).done((data) => {
      console.log(data);
      $.each(data, (index, student) => {
        let subjects = '';
        // console.log('i: is', index);
        $.each(student.subjects, (i, s) => {
          // console.log('s is :', s + i);
          subjects += `<button type="button" class="btn btn-outline-dark">${s}</button> `;
        })
        $('tbody').append(`
      <tr>
      <th scope="row">${index}</th>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.gender}</td>
      <td>${student._id}</td>
      <td>${subjects}</td>
      <td>
      <button type="button" class="btn btn-outline-success edit" data-id="${student._id}">Edit</button>
      <button type="button" class="btn btn-outline-danger delete" data-id="${student._id}">Delete</button>
      </td>
    </tr>`)
      });
    })
    .fail((xhr) => {
      console.log('error', xhr);
    })
};

// edit
$(document).on('click', 'button.edit', (e) => {
  e.preventDefault();
  const studentId = $(e.target).attr('data-id');
  console.log(studentId);

  $.ajax({
    url: `/api/student/ ${studentId}`,
    type: "PUT"
  }).done((data) => {
    console.log(data);
  })

});


// delete
$(document).on('click', 'button.delete', (e) => {
  e.preventDefault();
  const studentId = $(e.target).attr('data-id');
  console.log(studentId);

  $.ajax({
    url: `/api/student/ ${studentId}`,
    type: "DELETE"
  }).done((data) => {
    console.log(data);
  })
  loadAll();
});

//end
$(document).ready(function() {
  loadAll();
});
