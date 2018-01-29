//
function rowLoops(data) {
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
  })
};

// load all
function loadAll() {
  $.ajax({
      url: "api/students"
    }).done((data) => {
      $('tbody').empty();
      rowLoops(data);
    })
    .fail((xhr) => {
      console.log('error', xhr);
    })
};

// search
$(document).on('click', 'button.find', (e) => {
  e.preventDefault();
  const studentId = $('.form-control').val();

  $.ajax({
    url: `/api/student/${studentId}`,
  }).done((data) => {
    $('tbody').empty();
    /*
      if(!studentId === data.student._id) {
        console.log('student does not exist');
      } else {
      }
      */
    rowLoops([data]);
  })
});

// create
$(document).on('click', 'button.new', (e) => {
  e.preventDefault();
  $('#theModal').modal('show');
  $('.modal-title').text('Create Student');

  $.ajax({
      url: '/api/student/',
      type: "POST",
      dataType: 'json',
      contentType: "application/json",
      data: JSON.stringify({
        name: $('#newStudent input[name=name]').val(),
        age: $('#newStudent input[name=age]').val(),
        gender: $('#newStudent input[name=gender]:checked').val(),
        subjects: $('#newStudent input[name=subjects]').val()
      })
    })
    .done((data) => {
      $('tbody').empty();
      loadAll();
    });
  // rowLoops(data);
});

// edit
$(document).on('click', 'button.edit', (e) => {
  e.preventDefault();
  const studentId = $(e.target).attr('data-id');

  $.ajax({
    url: `/api/student/${studentId}`
  }).done((student) => {
    $('#theModal').modal('show');
    $('#newStudent input[name=name]').val(student.name);
    $('#newStudent input[name=age]').val(student.age);
    $('#newStudent input[name=subjects]').val(student.subjects.join(''));
    $(`#newStudent input[name=gender][value="${student.gender}"]`).prop('checked', true);
    $('#newStudent input[name-studentId]').val(student._id);
  })
});

$('#newStudent').on("submit", (e) => {
  e.preventDefault();
  $('#theModal').modal('hide');

  const name = $('#newStudent input[name=name]').val();
  const age = $('#newStudent input[name=age]').val();
  const gender = $('#newStudent input[name=gender]:checked').val();
  const subjects = $('#newStudent input[name=subjects]').val();
  const subjectsArray = subjects.split(" ");
  const studentId = $('#newStudent input[name-studentId]').val();

  if (studentId === '') {
    $.ajax({
        url: '/api/student/',
        type: "POST",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          name: name,
          age: age,
          gender: gender,
          subjects: subjectsArray
        })
      })
      .done((() => {
        loadAll();
      }));
  } else {
    $.ajax({
        url: `/api/student/${studentId}`,
        type: "PUT",
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify({
          name: name,
          age: age,
          gender: gender,
          subjects: subjectsArray
        })
      })
      .done((() => {
        loadAll();
      }));
  }
});

// delete
$(document).on('click', 'button.delete', (e) => {
  e.preventDefault();
  const studentId = $(e.target).attr('data-id');

  $.ajax({
    url: `/api/student/${studentId}`,
    type: "DELETE"
  }).done((data) => {
    loadAll();
  })
});

//end
$(document).ready(function() {
  loadAll();
});
