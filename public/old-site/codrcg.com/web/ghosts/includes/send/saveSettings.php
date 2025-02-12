<?php
	require('../../../includes/includes.php');
	ob_start('json_minify');
	new Session(['ALL']);
	header('Content-Type: application/json');

	/* Initialize Classes */
	$Settings = new Settings();

	$data['error'] = [];
	$data['settingsData'] = (isset($_POST['data']) ? $_POST['data']:'');
	$data['settingsData']['roll'] = (isset($data['settingsData']['roll']) ? $data['settingsData']['roll'] : []);
	$data['settingsData']['dlc'] = (isset($data['settingsData']['dlc']) ? $data['settingsData']['dlc'] : []);
	if(!isset($data['settingsData']['Level']) || !is_numeric($data['settingsData']['Level'])){
		$data['settingsData']['Level'] = 10;
	}


	if(isset($_SESSION['SESS_MID'])){
		$Settings->PutSetting($data['settingsData']['Level'], 'BO2_Level', $_SESSION['SESS_MID']);

		if($data['settingsData']['SettingType'] == 'roll'){
			$Settings->PutSetting($data['settingsData']['roll'], 'BO2_RollSettings', $_SESSION['SESS_MID']);

	  	}
	}

	if(isset($data['settingsData']['roll'])){ $_SESSION['BO2_RollSettings'] = $data['settingsData']['roll']; }else{ $_SESSION['BO2_RollSettings'] = []; }

	$_SESSION['BO2_Level'] = $data['settingsData']['Level'];

	unset($data['settingsData']['SettingType']);

	$data['errorcount'] = count($data['error']);
  	echo json_encode($data);
	exit();
?>