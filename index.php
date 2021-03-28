<!doctype html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- Favicon -->
	<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/custom.css?id=khaf">
</head>

<!--  BODY  -->

<body>
	<div class="container">
		<div class="row justify-content-between pt-3">
			<div class="col-xs-9">
					<img class="img d-inline my-4 ml-4" style="height:6rem;" src="assets/images/bg/logo-clean.png">
					<h1 class="display-4 d-sm-inline-block d-none align-middle ml-4">Idleon Companion</h1>
			</div>
			<div class="col-xs-3">
				<a type="button" class="btn btn-outline-light m-2" data-toggle="modal" data-target="#clockModal">
					<p class="m-0 text-left"><small>Reset Timer</small></p>
					<h3 class="display-4 m-0"  id="clock"></h3>
				</a>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="clockModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Configure Reset Timer </h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="text-light">Insert the hours and minutes of your reset timer</p>
						<div class="input-group">
							<input class="form-control w-25" type="number" id="hours" min="0" max="24" placeholder="Hours"/>
							<input class="form-control w-25" type="number" id="minutes" min="0" max="60" placeholder="Minutes"/>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button onclick="saveOffset()" type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="resetModal" tabindex="-1" role="dialog" aria-labelledby="resetModal" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="resetModalLabel">It's a new day!</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p class="text-light">Your timer expired, Would you like to reset your daily tasks?. </p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button onclick="resetDailies()" type="button" class="btn btn-primary" data-dismiss="modal">Reset Dailies</button>
					</div>
				</div>
			</div>
		</div>
		<!--  Nav  -->
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a class="nav-link active" data-toggle="tab" href="#tasks">Tasks</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#checklist">Checklist</a>
			</li>
			<li class="nav-item">
				<a class="nav-link " data-toggle="tab" href="#calc">King of Food</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#builds">Builds</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#cards">Card Sets</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" data-toggle="tab" href="#credits">Credits</a>
			</li>
		</ul>

		<div id="nav-tabContent" class="tab-content">
			<!--  TASKS  -->
			<div class="tab-pane fade active show" id="tasks">
				<?php include "pages/tasks.php" ?>
			</div>
			<!-- checklist -->
			<div class="tab-pane fade" id="checklist">
				<?php include "pages/checklist.php" ?>
			</div>
			<!--  KING OF FOOD  -->
			<div class="tab-pane fade" id="calc">
				<?php include "pages/king-of-food.php" ?>
			</div>
			<!--  BUILDS  -->
			<div class="tab-pane fade" id="builds">
				<?php include "pages/builds.php" ?>
			</div>
			<!--  CARD SETS -->
			<div class="tab-pane fade p-3" id="cards">
				<?php include "pages/cards.php" ?>
			</div>
			<!--  CREDITS -->
			<div class="tab-pane fade" id="credits">
				<?php include "pages/credits.php" ?>
			</div>
		</div>
		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
		<script src="assets/js/main.js?9555"></script>
	</div>
	<div class="footer m-5">
	</div>
</body>

</html>
