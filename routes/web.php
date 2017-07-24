<?php
/**
 * @author  Chintan Kotadia
 */
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', 'CalculatorController@index')->name('calculator');
Route::get('/calculator', 'CalculatorController@index')->name('calculator');
Route::get('calculator/saveUserLog','CalculatorController@saveUserLog');
Route::get('calculator/showLog','CalculatorController@showLog')->name('showLog');
Route::get('calculator/getUserLog','CalculatorController@getUserLog');
Auth::routes();