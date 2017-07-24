@extends('layouts.app')
@section('content')
<div class="container">
	<div id="calculator">
		<div class="row">
			<div class="col-sm-10">
				<div class="logs well">
				<!-- 	@if(isset($user_logs))
                        @foreach ($user_logs as $log)
                    <div class="log-text">{{ $log->logs }}</div>
                    @endforeach
                    @else
                    <div class="no-log-text">No log available.</div>
                    @endif -->
                </div>
            </div>
            @if($login == 1)
            <div class="col-sm-2">
                <button type="button" class="save-log btn btn-secondary">Save Log</button>
            </div>
            @endif
            <div class="clearfix"></div> 
            <div class="col-sm-2">
                <div class="well clear">
                 Clr
             </div>
         </div>
         <div class="col-sm-10">
          <div class="well result">
           0
       </div>
   </div>
   <div class="digits">
    <div class="col-xs-3"><div class="well digit">7</div></div>
    <div class="col-xs-3"><div class="well digit">8</div></div>
    <div class="col-xs-3"><div class="well digit">9</div></div>
    <div class="col-xs-3"><div class="well digit">+</div></div>

    <div class="col-xs-3"><div class="well digit">4</div></div>
    <div class="col-xs-3"><div class="well digit">5</div></div>
    <div class="col-xs-3"><div class="well digit">6</div></div>
    <div class="col-xs-3"><div class="well digit">-</div></div>

    <div class="col-xs-3"><div class="well digit">1</div></div>
    <div class="col-xs-3"><div class="well digit">2</div></div>
    <div class="col-xs-3"><div class="well digit">3</div></div>
    <div class="col-xs-3"><div class="well digit">&times;</div></div>

    <div class="col-xs-3"><div class="well digit">0</div></div>
    <div class="col-xs-3"><div class="well digit">.</div></div>
    <div class="col-xs-3"><div class="well digit">=</div></div>
    <div class="col-xs-3"><div class="well digit">&divide;</div></div>
</div>
<div></div>
</div>
</div>
</div>
<div id="log-name" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Add Name</h4>
    </div>
    <div class="modal-body">
        <form class="log-name-form">
            <div class="form-group">
                <label class="control-label col-sm-2" for="name">Name:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="name" required placeholder="Enter name">
                </div>
            </div>
        </form>
    </div>
    <div class="clearfix"></div>
    <div class="modal-footer">
        <button type="button" class="btn btn-default save-log-name">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    </div>
</div>

</div>
</div>
@endsection