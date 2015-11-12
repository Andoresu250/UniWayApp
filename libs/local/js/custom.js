$(document).ready(function() {
	//SEARCH
	//LISTO BOX
	$('select').material_select();
	$('#select_uni').prop('checked',true);
	$("input[name='time_search']").val("07:00");
	//PARA EL NAVBAR
    $(".button-collapse").sideNav();
    $('.button-collapse').sideNav('hide');
	//TODO ESTO EN EL CONTROLADOR DE HORARIOS
	$("input[name='mon_time_u']").val("06:30");
	$("#default_time_u").click(function () {
		var check = $("#default_time_u").is(':checked')		
		if(check){
			$("input[name='tue_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='wed_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='thu_time_u']").val($("input[name='mon_time_u']").val());	
			$("input[name='fri_time_u']").val($("input[name='mon_time_u']").val());					
		}else{
			$("input[name='tue_time_u']").val("");	
			$("input[name='wed_time_u']").val("");	
			$("input[name='thu_time_u']").val("");	
			$("input[name='fri_time_u']").val("");	
		}		
	});
	$("input[name='mon_time_h']").val("18:30");
	$("#default_time_h").click(function () {
		var check = $("#default_time_h").is(':checked')		
		if(check){
			$("input[name='tue_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='wed_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='thu_time_h']").val($("input[name='mon_time_h']").val());	
			$("input[name='fri_time_h']").val($("input[name='mon_time_h']").val());					
		}else{
			$("input[name='tue_time_h']").val("");	
			$("input[name='wed_time_h']").val("");	
			$("input[name='thu_time_h']").val("");	
			$("input[name='fri_time_h']").val("");	
		}		
	});
	$("#bc").click(function () {
		//ESTO DEBE ESTAR DENTRO DEL CONTROLADOR DE HORARIOS
		var mon_time_u = $("input[name='mon_time_u']").val();		
		var tue_time_u = $("input[name='tue_time_u']").val();
		var wed_time_u = $("input[name='wed_time_u']").val();		
		var thu_time_u = $("input[name='thu_time_u']").val();		
		var fri_time_u = $("input[name='fri_time_u']").val();

		var mon_time_h = $("input[name='mon_time_h']").val();
		var tue_time_h = $("input[name='tue_time_h']").val();
		var wed_time_h = $("input[name='wed_time_h']").val();		
		var thu_time_h = $("input[name='thu_time_h']").val();		
		var fri_time_h = $("input[name='fri_time_h']").val();

		var timetable = "";
		if(mon_time_u !== "" && mon_time_h !== ""){
			timetable += "mon-" + mon_time_u + "-" + mon_time_h + ";";
		}		
		if(tue_time_u !== "" && tue_time_h !== ""){
			timetable += "tue-" + tue_time_u + "-" + tue_time_h + ";";
		}
		if(wed_time_u !== "" && wed_time_h !== ""){
			timetable += "wed-" + wed_time_u + "-" + wed_time_h + ";";
		}
		if(thu_time_u !== "" && thu_time_h !== ""){
			timetable += "thu-" + thu_time_u + "-" + thu_time_h + ";";
		}
		if(fri_time_u !== "" && fri_time_h !== ""){
			timetable += "fri-" + fri_time_u + "-" + fri_time_h + ";";
		}	
		if(timetable!==""){
			timetable = timetable.substring(0,timetable.length-1);
		}		
		console.log(timetable);
	});
});
