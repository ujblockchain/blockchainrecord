
/**
 * Tuna Signup Form Wizard
 * @type Javascript Class
 */

var tunaWizard = {
    stepCount: 0,
    slider: null,
    uploadedFiles:[],
    /**
     * Resize for Responsive
     */
    setResponsive: function () {
        var self = this;
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        windowHeight = windowHeight > 360 ? windowHeight : 360;
        var tunaContainer = $(".tuna-signup-container");
        var tunaLeft = $(".tuna-signup-left");
        var tunaRight = $(".tuna-signup-right");

        if (windowWidth >= 768) {
            tunaContainer.add(tunaLeft).add(tunaRight).innerHeight(windowHeight);
        } else {
            tunaContainer.add(tunaLeft).add(tunaRight).css("height", "auto");
        }

        //Testimonail Slider Show/Hide
        var sliderContainer = $(".tuna-slider-container");
        if (windowHeight < 600 || windowWidth < 768) {
            sliderContainer.hide();
        } else {
            sliderContainer.show();
            //Reload slider because of hidden
            self.slider.reloadSlider();
        }
        if (windowHeight < 400) {
            $(".button-container").css("bottom", "50px");
        }

    },
    /**
     * Change Step
     * @param int currentStep
     * @param int nextStep
     * @returns {void|Boolean}
     */
    changeStep: function (currentStep, nextStep) {
        var self = this;

        if (nextStep <= 0 && nextStep > 4) {
            return false;
        }

        //Validations
        if (nextStep === 2) {
            if ($("#product_id").val().trim() === "") {
                self.setInputError($("#product_id"));
                return;
            }
        }
        //Checboxes validation
        if (nextStep === 3) {
            if ($("input[name='corn_color']:checked").length == 0) {
                self.setInputError($("input[name='corn_color']"));
                return;
            }
        }

        if (nextStep === 4) {
            if ($("#quantity").val().trim() === "") {
                self.setInputError($("#quantity"));
                return;
            }
        }

        //Change Step
        if (nextStep > currentStep) {
            $(".step-active").removeClass("step-active").addClass("step-hide");
        } else {
            $(".step-active").removeClass("step-active");
        }

        var nextStepEl = $(".step[data-step-id='" + nextStep + "']");
        nextStepEl.removeClass("step-hide").addClass("step-active");

        //Focus Input
        window.setTimeout(function () {
            if (nextStep !== self.stepCount) {
                nextStepEl.find("input").focus();
            }
        }, 500);

        var stepCountsEl = $(".steps-count");
        if (nextStep === self.stepCount) {
            stepCountsEl.html("CONFIRM DETAILS");
            $(".button-container").hide();
            var stepConfirm = $(".step-confirm");
            stepConfirm.find("input[name='product_id']").val($("#product_id").val());
            //
            var color = $("input[name='corn_color']:checked").map(function () {
                return this.value;
            }).get();
            stepConfirm.find("select[name='corn_color']").selectpicker("val", color);
            //
            stepConfirm.find("input[name='quantity']").val($("#quantity").val());
        }

        //Current Step Number update
        stepCountsEl.find("span.step-current").text(nextStep);

        //Hide prevButton if we are in first step
        var prevStepEl = $(".prevStep");
        if (nextStep === 1) {
            prevStepEl.hide();
        } else {
            prevStepEl.css("display", "inline-block");
        }
    },
    /**
     * Show Validation Message
     * @param HtmlElement el
     * @returns void
     */
    setInputError: function (el) {
        el.addClass("input-error");
        el.parents(".step").find(".help-info").hide();
        el.parents(".step").find(".help-error").show();
    },

    /**
     * Executes Signup Wizard
     * @returns void
     */
    start: function () {
        var self = this;
        /**
         * Testimonial Slider - Uses bxslider jquery plugin
         */
        self.slider = $('.tuna-slider').bxSlider({
            controls: false, // Left and Right Arrows
            auto: true, // Slides will automatically transition
            mode: 'horizontal', // horizontal,vertical,fade
            pager: true, // true, a pager will be added
            speed: 500, // Slide transition duration (in ms)
            pause: 5000 // The amount of time (in ms) between each auto transition
        });

        //Jquery Uniform Plugin
        $(".tuna-signup-container input[type='checkbox'],.tuna-signup-container input[type='radio'], .select").uniform();


        // Focuses on name input, when page loaded
        window.setTimeout(function () {
            $("#product_id").focus();
        }, 500);

        // Responsive
        self.setResponsive();
        $(window).resize(function () {
            self.setResponsive();
        });

        // Steps Count
        self.stepCount = $(".tuna-steps .step").length;
        $(".step-count").text(self.stepCount);

        // Next Step
        $(".nextStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) + 1;
            self.changeStep(currentStep, nextStep);
        });

        // Prev Step
        $(".prevStep").on("click", function () {
            var currentStep = $(".step-active").attr("data-step-id")
            var nextStep = parseFloat(currentStep) - 1;
            self.changeStep(currentStep, nextStep);
        });

        // Confirm Details - Show Input
        var stepConfirm = $(".step-confirm");
        stepConfirm.find(".input-container a.editInput").on("click", function () {
            $(this).parent().find("input").focus();
        });

        // Confirm Details - Show Password
        stepConfirm.find(".input-container a.showPass").on("mousedown", function () {
            $(this).parent().find("input").attr("type", "text");
        }).mouseup(function () {
            $(this).parent().find("input").attr("type", "password");
        });

        stepConfirm.find(".input-container input").on("focus", function () {
            $(this).parent().find("a").hide();
        });

        stepConfirm.find(".input-container input").on("focusout", function () {
            if (!$(this).hasClass("confirm-input-error")) {
                $(this).parent().find("a").show();
            }
        })

        stepConfirm.find("select").on('shown.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").hide();
        }).on('hidden.bs.select', function (e) {
            $(this).parents(".form-group").find("a.editInput").show();
        });

        //Press Enter and go to nextStep
        $(".step input").not(".step-confirm input").on("keypress", function (e) {
            if (e.keyCode === 13) {
                $(".nextStep").click();
            }
        });

        var signupForm = $("form[name='signupForm']");
        //Press Enter and submit form
        signupForm.find("input").on("keypress", function (e) {
            if (e.keyCode === 13) {
                signupForm.submit();
            }
        });

        //Finish Button
        $(".finishBtn").on("click", function () {
            signupForm.submit();
        })

        // Form Submit
        signupForm.on("submit", function (e) {

            e.preventDefault();

            $(this).find(".confirm-input-error").removeClass("confirm-input-error");

            var nameInput = $(this).find("input[name='product_id']");
            if (nameInput.val().trim() === "") {
                nameInput.addClass("confirm-input-error").focus();
                return;
            }

            var color = $(this).find("select[name='corn_color']");
            
            if (color.find("option:selected").length === 0) {
                //add class to parent element, because this is bootstrap-select.
                color.parents(".bootstrap-select").addClass("confirm-input-error").focus();
                color.selectpicker('toggle');
                return;
            }

            var quantityInput = $(this).find("input[name='quantity']");
            if (quantityInput.val().trim() === "") {
                quantityInput.addClass("confirm-input-error").focus();
                return;
            }

        });


    },
}


/**
 * Material Input 
 * @returns object
 */
$.fn.materialInput = function () {

    var label;
    var el = this;

    el.find('input.formInput').keydown(function (e) {
        el.setLabel(e.target);
        el.checkFocused(e.target);
    });

    el.find('input.formInput').focusout(function (e) {
        el.setLabel(e.target);
        el.checkUnFocused(e.target);
    });

    this.setLabel = function (target) {
        label = el.find('label[for=' + target.id + ']');
    };

    this.getLabel = function () {
        return label;
    };

    this.checkFocused = function (target) {
        el.getLabel().addClass('active', '');
        $(target).removeClass("input-error");
        $(target).next().hide();
        $(target).parent().find(".info").show();
    };

    this.checkUnFocused = function (target) {
        if ($(target).val().length === 0) {
            el.getLabel().removeClass('active');
        }
    };
};


$(document).ready(function () {

    /**
     * Page Loader
     * If you remove loader, you can delete .tuna-loader-container element from Html, and delete this two rows.
     */
    $(".tuna-loader-container").fadeOut("slow");
    $(".tuna-signup-container").show();


    /**
     * Material Inputs
     * Makes, inputs in selected element material design.
     */
    $(".tuna-steps").materialInput();

    /**
     * Bootstrap Select Plugin
     */
    $(".selectpicker").selectpicker();

    /**
     * Tuna Signup Form Wizard
     * Let's Start
     */
    tunaWizard.start();

});

