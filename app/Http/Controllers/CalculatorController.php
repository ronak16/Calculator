<?php
/**
 * @author  Chintan Kotadia
 */

namespace App\Http\Controllers;
use App\User;
use App\UserLogs;
use Illuminate\Http\Request;


class CalculatorController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = [];
        $data['login'] = false;
        
        if (\Auth::user()){
            $data['user'] = \Auth::user();
            $data['login'] = true;
        //    $data['user_logs'] = UserLogs::where('user_id',\Auth::user()->id)->get();
        }
        
        return view('calculator',$data);
    }
    /**
    * save user logdata 
    * @return response 
    */
    public function saveUserLog(Request $request){
        $response = [];
        $UserLogs = new UserLogs;
        $UserLogs->user_id = \Auth::user()->id;
        $UserLogs->log_name = $request->input('name');
        $UserLogs->logs = $request->input('logs');
        $UserLogs->save();
        echo json_encode($response['status'] = true);
        exit(); 
    }

     /**
     * Show the user logs.
     *
     * @return \Illuminate\Http\Response
     */
     public function showLog(){
        $data = [];
        $user = \Auth::user();    
        $data['logs'] = UserLogs::select('log_name', 'id')
        ->where('user_id',\Auth::user()->id)->get();
        return view('logs',$data);
    }
    /**
    * get user logdata 
    * @return logdata 
    */
    public function getUserLog(Request $request){
        $response = [];
        $logid = $request->input('id');
        $response['logs'] = UserLogs::select('logs')
                            ->where('id',$logid)
                            ->get();
        echo json_encode($response);
        exit;
    }
}