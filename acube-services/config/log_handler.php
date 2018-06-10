<?php

//echo("Error Custome log triggered \n");
error_reporting(0);  // to create  a own error handling

// user defined function

function userErrorHandler($errno, $errmsg, $filename, $linenum, $vars)
{
// timestamp for the error entry.
$dt = date('Y-m-d H:i:s (T)');
// errors types

$errortype = array (
E_ERROR => 'Error',
E_WARNING => 'Warning',
E_PARSE => 'Parsing Error',
E_NOTICE => 'Notice',
E_CORE_ERROR => 'Core Error',
E_CORE_WARNING => 'Core Warning',
E_COMPILE_ERROR => 'Compile Error',
E_COMPILE_WARNING => 'Compile Warning',
E_USER_ERROR => 'User Error',
E_USER_WARNING => 'User Warning',
E_USER_NOTICE => 'User Notice',
E_STRICT => 'Runtime Notice'
);

if (array_key_exists($errno, $errortype)) {
		$err = $errortype[$errno];
	} else {
		$err = 'CAUGHT EXCEPTION';
	}

$user_errors = array(E_USER_ERROR, E_USER_WARNING, E_USER_NOTICE);

$err = "<br><errorentry>\n";
$err .= "\t<datetime>" .$dt. "</datetime>\n";
$err .= "\t<errornum>" .$errno. "</errornum>\n";
$err .= "\t<errortype>" .$errortype[$errno]. "</errortype>\n";
$err .= "\t<errormsg>" .$errmsg. "</errormsg>\n";
$err .= "\t<scriptname>" .$filename. "</scriptname>\n";
$err .= "\t<scriptlinenum>" .$linenum. "</scriptlinenum>\n";

if (in_array($errno, $user_errors)) {
$err .= "\t<vartrace>" .wddx_serialize_value($vars, 'Variables'). "</vartrace>\n";
}
$err .= "</errorentry>\n\n";

// write the errors to one file that is
$file = '/Users/bijeshkumarvattapparambath/03 - APP_LOGS/01PAAP/errorlog.log';
//'/Users/bvattapparam/02 PERSONAL/aswap/aswa-services/config/errorlog.log';

		 ///Users/bvattapparam/02 PERSONAL/aswap/aswa-services/config
//$file = '/Users/bvattapparam/05 APPLICATIONS-DMG/01 Application Logs/01 aswap-services/errorlog.log';
error_log($err, 3, $file);
//echo($err);
}



// to call the user defined function
$old_error_handler = set_error_handler('userErrorHandler');

?>