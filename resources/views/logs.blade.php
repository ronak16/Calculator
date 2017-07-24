@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="form-group">
            @if(count($logs) > 0)
            <label for="name">Select Name:</label>
            <select class="form-control" id="log-name">
                <option value="">Select Name</option>
                @foreach($logs as $log)
                <option value="{{ $log->id }}">{{ $log->log_name }}</option>
                @endforeach                
            </select>
            @else
            <label class="well col-sm-12">No Log Available</label>
            @endif
        </div>
      <div class="logs-data well">
      </div>
      <div class="loader"></div>
  </div>
</div>
@endsection