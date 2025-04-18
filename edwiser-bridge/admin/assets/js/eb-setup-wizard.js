(function ($) {
    'use strict';

    $(document).ready(function () {


        // ----    ------
        $(document).on('click', '.accordion', function (event) {

            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });

        function change_url( step ) {
            var url = new URL(document.location);
            url.searchParams.set('current_step', step);
            window.history.replaceState( null, null, url );
        }


        // ----   ------

        // ajax call to change the tab.
        /**
         * Reload the Moodle course enrollment.
         */
        // $('.eb-setup-step-completed').click(function(){

        //     // Create loader.
        //     $("#eb-lading-parent").show();

        //     var current = $(this);
        //     var step = $(this).data('step');

        //     change_url( step );

        //     $.ajax({
        //         method: "post",
        //         url: eb_setup_wizard.ajax_url,
        //         dataType: "json",
        //         data: {
        //             'action': 'eb_setup_change_step',
        //             'step': step,
        //             // 'course_id': course_id,
        //             'nonce': eb_setup_wizard.nonce,
        //         },
        //         success: function (response) {

        //             current.find('.eb-load-response').remove();
        //             //prepare response for user
        //             if (response.success == 1) {
        //                 $('.eb-setup-content').html(response.data.content);
        //                 $('.eb-setup-header-title').html(response.data.title);

        //             } else {

        //             }

        //             $("#eb-lading-parent").hide();

        //         }
        //     });

        // });



        var loader = '<div id="eb-lading-parent" class="eb-lading-parent-wrap"><div class="eb-loader-progsessing-anim"></div></div>';
        $("body").append(loader);
        

        /**
         * Close setup.
         */
        //  $('.eb-setup-close-icon').click(function(){
        $(document).on('click', '.eb-setup-close-icon', function (event) {

            // Create loader.

            $.ajax({
                method: "post",
                url: eb_setup_wizard.ajax_url,
                dataType: "json",
                data: {
                    'action': 'eb_setup_close_setup',
                    'nonce': eb_setup_wizard.nonce,
                },
                success: function (response) {

                    //prepare response for user
                    if (response.success == 1) {
                        $('.eb-setup-content').append('<div class="eb_setup_popup"> ' + response.data.content + ' </div>');

                    } else {

                    }
                }
            });

        });

        $(document).on('click', '.eb_setup_do_not_close', function (event) {
            $('.eb_setup_popup').remove();
        });

        

        

        $(document).on('click', '.eb_complete_setup_btn', function (event) {
            var $this = $(this);
            var current_step = 'completed_setup';
            var next_step = '';
            var is_next_sub_step = 0;


            // get current step.
            // get next step.
            // get data which will be saved.

            // Creating swicth case.

            var data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };

            $.ajax({
                method: "post",
                url: eb_setup_wizard.ajax_url,
                dataType: "json",
                data: {
                    'action': 'eb_setup_save_and_continue',
                    'nonce': eb_setup_wizard.nonce,
                    'data': data,
                },
                success: function (response) {

                }
            });





        });



        // ajax xall to save data and get new tab at the same time.
        
        // Clicking save continue
        // 
        // $('.eb_setup_save_and_continue').click(function(){
        $(document).on('click', '.eb_setup_save_and_continue', function (event) {


            var $this = $(this);
            var current_step = $(this).data('step');
            var next_step = $(this).data('next-step');
            var is_next_sub_step = $(this).data('is-next-sub-step');

            if ( $('.eb_setup_popup').length ) {
                $('.eb_setup_popup').remove();
            }

            // get current step.
            // get next step.
            // get data which will be saved.

            // Creating swicth case.

            var data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };

            switch ( current_step ) {
                case 'moodle_redirection':

                    // $(document).on( 'click', '.eb_setup_moodle_redirection_btn', function(event){
                    if( '' == $('#eb_setup_test_conn_mdl_url').val() ){
                        console.log();
                        event.preventDefault();
                        $('#eb_setup_test_conn_mdl_url').css('border-color', 'red');
                    } else {

                                // });
                        $("#eb-lading-parent").show();

                        // Get required data and create array
                        $("#eb-lading-parent").hide();

                        $('.eb-setup-content').append('<div class="eb_setup_popup"> ' + $('.eb_setup_moodle_redirection_popup').html() + ' </div>');
                        data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };


                        // Set data progress first.
                        $.ajax({
                            method: "post",
                            url: eb_setup_wizard.ajax_url,
                            dataType: "json",
                            data: {
                                'action': 'eb_setup_save_and_continue',
                                'nonce': eb_setup_wizard.nonce,
                                'data': data,
                            },
                            success: function (response) {
                            }
                        });


                        setTimeout( function(){
                            // $('.eb-setup-content').html(response.data.content);
                            // $('.eb-setup-header-title').html(response.data.title);
                            var mdl_url = $('#eb_setup_test_conn_mdl_url').val();
                            // There is only one exceptional step where we are redirecting user to Moodle so checking it directly.
                            window.location.replace( mdl_url + '/auth/edwiserbridge/setup_wizard.php' );
                            data = { 'mdl_url' : mdl_url, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                        }  , 2000 );
                    }
                    
                    // var mdl_url = $('#eb_setup_test_conn_mdl_url').val();
                    // // There is only one exceptional step where we are redirecting user to Moodle so checking it directly.
                    // window.location.replace( mdl_url + '/auth/edwiserbridge/setup_wizard.php' );
                    // data = { 'mdl_url' : mdl_url, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    return;
                    break;

                case 'test_connection':
                    $("#eb-lading-parent").show();

                    var mdl_url      = $('#eb_setup_test_conn_mdl_url').val().trim();
                    var mdl_token    = $('#eb_setup_test_conn_token').val().trim();
                    var mdl_lang_code = $('#eb_setup_test_conn_lang_code').val().trim();

                    data = { 'mdl_url' : mdl_url, 'mdl_token' : mdl_token, 'mdl_lang_code': mdl_lang_code, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    
                    break;
            
                case 'course_sync':
                    // Course sync process.
                    // Call course sync callback and after completing the process, call this callback.
                    $("#eb-lading-parent").show();

                    var publish = $('.eb_setup_course_sync_inp').prop('checked') ? 1 : 0;

                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step, 'publish': publish };
                    break;

                case 'user_sync':
                    $("#eb-lading-parent").show();

                    // If user checkbox is clicked start user sync otherwise just procedd to next screen.
                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'free_recommended_settings':
                    $("#eb-lading-parent").show();

                    var user_account_page      = $('#eb_setup_user_accnt_page').val();
                    var user_account_creation  = $('#eb_setup_user_account_creation').prop('checked') ? 1 : 0;
                    // user account page selection and enable registration on user account
                    data = { 'user_account_page': user_account_page, 'user_account_creation': user_account_creation, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'pro_initialize':
                    $("#eb-lading-parent").show();
                    
                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'license':
                    $("#eb-lading-parent").show();

                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;
                
                case 'pro_plugins':
                    $("#eb-lading-parent").show();
                    var sso = $('.eb_setup_sso_inp').prop('checked') ? 1 : 0;
                    var woo_int = $('.eb_setup_woo_int_inp').prop('checked') ? 1 : 0;
                    var bulk_purchase = $('.eb_setup_bulk_purchase_inp').prop('checked') ? 1 : 0;
                    var selective_sync = $('.eb_setup_selective_sync_inp').prop('checked') ? 1 : 0;
                    var custom_fields = $('.eb_setup_custom_fields_inp').prop('checked') ? 1 : 0;

                    if ( bulk_purchase == 1 && woo_int == 0 ) {
                        $('.eb_setup_settings_error_msg').html(eb_setup_wizard.msg_woo_int_enable_error).show();
                        $("#eb-lading-parent").hide();
                        return;
                    }

                    // if no plugin is selected then show error message.
                    if ( sso == 0 && woo_int == 0 && bulk_purchase == 0 && selective_sync == 0 && custom_fields == 0 ) {
                        $('.eb_setup_settings_error_msg').html(eb_setup_wizard.msg_no_plugin_selected_error).show();
                        $("#eb-lading-parent").hide();
                        return;
                    }

                    if ( woo_int == 1 && eb_setup_wizard.is_woo_active == false ){
                        $('.eb_setup_settings_error_msg').html(eb_setup_wizard.msg_woo_enable_error).show();
                        $("#eb-lading-parent").hide();
                        return;
                    }

                    data = { 'sso': sso, 'woo_integration': woo_int, 'bulk_purchase': bulk_purchase, 'selective_sync': selective_sync, 'custom_fields': custom_fields, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'wp_plugins':
                    $("#eb-lading-parent").show();

                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'mdl_plugins':
                    $("#eb-lading-parent").show();

                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'sso':
                    $("#eb-lading-parent").show();

                    var sso_key = $('#eb_setup_pro_sso_key').val();
                    data = { 'sso_key': sso_key, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'wi_products_sync':
                    $("#eb-lading-parent").show();

                    $("#eb-lading-parent").hide();
                    $('.eb-setup-content').append('<div class="eb_setup_popup"> ' + $('.eb_setup_product_sync_progress_popup').html() + ' </div>');
                    
                    data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };
                    break;

                case 'pro_settings':
                    $("#eb-lading-parent").show();

                    // Here settings is to hide archive page and in WP settings it is show settings page.
                    // so passing settings in opposite manner i.e if checked pass 0 and if not checked pass 1.
                    var archive_page = $('#eb_pro_rec_set_archive_page').prop('checked') ? 0 : 1;
                    var guest_checkout = $('#eb_pro_rec_set_guest_checkout').prop('checked') ? 0 : 1;
                    data = { 'archive_page': archive_page, 'guest_checkout' : guest_checkout, 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step };

                    break;
                    

                default:
                    $("#eb-lading-parent").show();
                    break;
            }


            $.ajax({
                method: "post",
                url: eb_setup_wizard.ajax_url,
                dataType: "json",
                data: {
                    'action': 'eb_setup_save_and_continue',
                    'nonce': eb_setup_wizard.nonce,
                    // 'action': 'eb_setup_' + step,
                    'data': data,
                    // '_wpnonce_field': eb_admin_js_object.nonce,
                },
                success: function (response) {

                    //prepare response for user
                    if (response.success == 1) {
                        // If final step show pop up
                        if ( response.data.popup ) {
                            $('.eb-setup-content').append('<div class="eb_setup_popup"> ' + response.data.content + ' </div>');
                        } else {

                            // If product sync then add success icon to the div and then perform function after 1 second
                            if ( 'wi_products_sync' == current_step ) {
                                var icon = $('.animated__text');
                                icon.html('<span class="dashicons dashicons-yes-alt eb_setup_pupup_success_icon"></span>');
                                icon.removeClass('animated__text');

                                setTimeout( function(){
                                    $('.eb-setup-content').html(response.data.content);
                                    $('.eb-setup-header-title').html(response.data.title);
                                }  , 2000 );


                            } else {
                                $('.eb-setup-content').html(response.data.content);
                                $('.eb-setup-header-title').html(response.data.title);
                            }
                            
                            change_url( next_step );
                            
                            
                        }
                        handle_step_progress( current_step, next_step );
                    } else {
    
                    }

                    $("#eb-lading-parent").hide();

                }
            });

        });

        // Sync courses
        $(document).on('click', '.eb_setup_course_sync_btn', function (event) {
            
            $("#eb-lading-parent").show();

            // Course sync process.
            // Call course sync callback and after completing the process, call this callback.
            var publish = $('.eb_setup_course_sync_inp').prop('checked') ? 1 : 0;

            // data = { 'current_step' : current_step, 'next_step' : next_step, 'is_next_sub_step': is_next_sub_step, 'publish': publish };

            var $this = $(this);
            //display loading animation
            $.ajax({
                method: "post",
                url: eb_setup_wizard.ajax_url,
                dataType: "json",
                data: {
                    'action': 'eb_setup_course_sync',
                    'publish': publish,
                    '_wpnonce_field': eb_setup_wizard.nonce,
                },
                success: function (response) {

                    //prepare response for user
                    // if (response.data.success == 1) {
                    $('.eb_setup_settings_success_msg').css('display', 'block');
                    $('.eb_setup_test_conn_error').css('display', 'none');

                    $('.eb_setup_course_sync_btn').css('display', 'none');
                    $('.eb_setup_course_sync_cont_btn').css('display', 'initial');

                    // } else {
                    //     // ohSnap(response.response_message, 'error', 0);
                    //     $('.eb_setup_test_conn_error').css('display', 'block');
                    //     $('.eb_setup_test_conn_success').css('display', 'none');

                    //     $('.eb_setup_test_conn_error').html( 'Error : ' + response.data.response_message);
                    // }

                    $("#eb-lading-parent").hide();

                },
                error: function (response) {

                }
            });
        
        });



            function handle_step_progress( current_step, next_step ) {
                /**
                 * 1. Mark current step as active and 
                 * 2. Mark previous step as completed.
                 */
                // Add completed class to the sidebar steps.
                $('.eb-setup-step-' + current_step).addClass('eb-setup-step-completed-wrap');
                $('.eb-setup-step-' + current_step).removeClass('eb-setup-step-active-wrap');
                var step_title = $('.eb-setup-step-' + current_step).children('.eb-setup-steps-title');
                step_title.addClass('eb-setup-step-completed');
                step_title.removeClass('eb-setup-step-active');
                var step_icon = $('.eb-setup-step-' + current_step).children('.eb_setup_sidebar_progress_icons');
                step_icon.addClass('dashicons dashicons-yes-alt');
                step_icon.removeClass('eb-setup-step-circle dashicons-arrow-right-alt2');

                $('.eb-setup-step-' + next_step).addClass('eb-setup-step-active-wrap');
                $('.eb-setup-step-' + next_step).removeClass('eb-setup-step-completed-wrap');

                var step_title = $('.eb-setup-step-' + next_step).children('.eb-setup-steps-title');
                step_title.addClass('eb-setup-step-active');
                step_title.removeClass('eb-setup-step-completed');

                var step_icon = $('.eb-setup-step-' + next_step).children('.eb_setup_sidebar_progress_icons');
                step_icon.addClass('dashicons dashicons-arrow-right-alt2');
                step_icon.removeClass('eb-setup-step-circle');
                step_icon.removeClass('dashicons-yes-alt');
            }


            /* Function for link users to moodle, this will have a ajax call which will run after completion of another(recursively) */
            function userLinkSyncAjax($this, sync_options, offset, linkedUsers, users_count, queryLimit, notLinkedusers, send_mail) {
                $('.load-response').show();
                var response_message = '';
                var user_id_success = '';
                var user_id_error = '';
                if (!$('.response-box').is(":empty")) {
                    $('.linkresponse-box').css('margin-top', '3%');
                }
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    dataType: "json",
                    data: {
                        'action': 'handleUserLinkToMoodle',
                        'sync_options': JSON.stringify(sync_options),
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                        'offset': offset,
                        'send_mail' : send_mail
                    },
                    success: function (response) {
                        $("#eb-lading-parent").hide();

                        queryLimit = queryLimit + 20;
                        offset = offset + Math.abs(parseInt(response.unlinked_users_count) - parseInt(response.linked_users_count));
                        linkedUsers = parseInt(linkedUsers) + parseInt(response.linked_users_count);
                        users_count = parseInt(linkedUsers) + parseInt(response.users_count);
                        
                        showLinkedUsersProgress(linkedUsers, users_count, 'success');

                        if (response.connection_response == 1) {
                            if (response.user_with_error !== undefined) {
                                $.each(response.user_with_error, function (index, value) {
                                    if (!notLinkedusers.includes(value)) {
                                        notLinkedusers.push(value);
                                        user_id_error += this;
                                    }
                                });
                            }

                            if ( queryLimit < users_count ) {
                                userLinkSyncAjax($this, sync_options, offset, linkedUsers, users_count, queryLimit, notLinkedusers, send_mail);
                            } else {

                                var icon = $('.animated__text');
                                icon.html('<span class="dashicons dashicons-yes-alt eb_setup_pupup_success_icon"></span>');
                                icon.removeClass('animated__text');

                                setTimeout( function(){
                                    $('.eb_setup_popup').css('display', 'none');
                                    $( ".eb_setup_save_and_continue").click();
                                }  , 2000 );

                            }
                        } else {
                            $('.load-response').hide();
                            // linkUserResponseBox(eb_setup_wizard.msg_con_prob, 'error', 0);
                        }
                    }
                });
            }

            
            $(document).on('click', '.eb_setup_users_sync_btn', function (event) {
                var $this = $(this);
                $("#eb-lading-parent").show();

                var sync_options = {};
                // prepare sync options array
                var sync_options = {eb_synchronize_user_courses: 1, eb_link_users_to_moodle: 1};
                var send_mail = $('#eb_setup_user_sync_cb').prop('checked') ? 1 : 0;

                var offset = 0;
                var progressWidth = 0;
                var linkedUsers = 0;
                var users_count = 0;
                var queryLimit = 0;
                var notLinkedusers = [];

                // Showing pop up but here data will be empty
                $('.eb-setup-content').append('<div class="eb_setup_popup"> ' + $('.eb_setup_users_sync_progress_popup').html() + ' </div>');
                // arrow_animate();

                userLinkSyncAjax($this, sync_options, offset, linkedUsers, users_count, queryLimit, notLinkedusers, send_mail);

                // Trigger save and continue button.
            });



            /* Function to show progress of link users to moodle functionality*/
            function showLinkedUsersProgress(linked_users_count = 0, users_count = 0, type) {
                // var container = $('.linkresponse-box');
                // var html = '<div class="alert alert-' + type + '">' + linked_users_count + ' / ' + unlinked_users_count + ' ' + eb_setup_wizard.msg_user_link_to_moodle_success + '</div>';
                // container.empty();
                // container.append(html);

                $('.eb_setup_users_sync_users').html(linked_users_count);
                $('.eb_setup_users_sync_total_users').html(users_count);

            }




            /**
             * creates ajax request to initiate test connection request
             * display a response to user on process completion
             */
            $(document).on('click', '.eb_setup_test_connection_btn', function (event) {
                $("#eb-lading-parent").show();
                //get selected options
                var url   = $('#eb_setup_test_conn_mdl_url').val();
                var token = $('#eb_setup_test_conn_token').val();

                var $this = $(this);
                //display loading animation
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    dataType: "json",
                    data: {
                        'action': 'eb_setup_test_connection',
                        'url': url.trim(),
                        'token': token.trim(),
                        '_wpnonce_field': eb_setup_wizard.nonce,
                    },
                    success: function (response) {
                        //prepare response for user
                        if (response.data.success == 1) {
                            $('.eb_setup_test_conn_success').css('display', 'block');
                            $('.eb_setup_test_conn_error').css('display', 'none');

                            $('.eb_setup_test_connection_btn').css('display', 'none');
                            $('.eb_setup_test_connection_cont_btn').css('display', 'initial');

                        } else {
                            $('.eb_setup_diagnostics_btn').show();
                            // ohSnap(response.response_message, 'error', 0);
                            $('.eb_setup_test_conn_error').css('display', 'block');
                            $('.eb_setup_test_conn_success').css('display', 'none');

                            $('.eb_setup_test_conn_error').html( 'Error : ' + response.data.response_message);
                        }

                        $("#eb-lading-parent").hide();

                    },
                    error: function (response) {
                        $('.eb_setup_diagnostics_btn').show();
                    }
                });
            });

            $(document).on('click', '.eb_setup_diagnostics_btn', function () {
                //get selected options
                //

                //get selected options
                var url = $('#eb_setup_test_conn_mdl_url').val();
                var token = $('#eb_setup_test_conn_token').val();
                var $this = $(this);
                if (token.length > 0 && url.length > 0) {
                    var checks = ['json_valid', 'token_validation', 'server_blocking_check', 'permalink_setting',
                        'get_endpoint', 'post_endpoint'];
                } else {
                    var checks = ['json_valid', 'token_validation', 'permalink_setting'];
                }
                jQuery(this).attr('disabled', 'disabled');
                start_diagnostics(url, token, $this, checks);
            });

            async function start_diagnostics(url, token, $this, checks) {
                let completed = 0;
                jQuery('.run-diagnostics-start').html('<h2>' + eb_setup_wizard.running_diagnostics + '</h2>');
                checks.forEach(async (check) => {
                    const res = await single_diagnostic(url, token, $this, check);
                    // jQuery('.run-diagnostics-start img.' + check + '_loader + .diagnostic_check_name').after( '<span class="auto_fix_issue eb_' + check + '_fix">Fix Now</span><div class="autofix_custom_message"></div>' );
                    if (res) {
                        jQuery('.run-diagnostics-start img.' + check + '_loader').attr('src', eb_setup_wizard.plugin_url + 'images/success.png');
                    } else {
                        if (check == 'token_validation') {
                            jQuery('.run-diagnostics-start img.' + check + '_loader').attr('src', eb_setup_wizard.plugin_url + 'images/error.png');
                            jQuery('.run-diagnostics-start img.' + check + '_loader + .diagnostic_check_name').after('<span class="auto_fix_issue eb_' + check + '_fix">' + eb_setup_wizard.eb_fix_now + '</span><div class="autofix_custom_message"></div>');
                        } else {
                            jQuery('.run-diagnostics-start img.' + check + '_loader').attr('src', eb_setup_wizard.plugin_url + 'images/error.png');
                            jQuery('.run-diagnostics-start img.' + check + '_loader + .diagnostic_check_name').after('<span class="auto_fix_issue eb_' + check + '_fix">' + eb_setup_wizard.get_more_details + '</span><div class="autofix_custom_message"></div>');
                        }
                    }
                    completed++;
                    if (completed == 6) {// checks count
                        jQuery('.run-diagnostics-start h2').html(eb_setup_wizard.diagnostics_completed);
                        jQuery('.eb_setup_diagnostics_btn').removeAttr('disabled');
                    }
                    console.log('--->', check + res);
                });
            }

            function single_diagnostic(url, token, $this, check) {
                return new Promise((resolve, reject) => {
                    jQuery('.run-diagnostics-start').append('<li><img class= "' + check + '_loader" src="' + eb_setup_wizard.plugin_url
                        + 'images/loader.gif" height="20" width="20" style="vertical-align: bottom;" /> <span class="diagnostic_check_name">' + eb_setup_wizard[check] +
                        '</span></li>');
                    if ('token_validation' == check) {
                        if (token.length > token.trim().length) {
                            resolve(false);
                        }
                    }
                    $.ajax({
                        method: "post",
                        url: eb_setup_wizard.ajax_url,
                        data: {
                            'action': 'eb_' + check,
                            'url': url.trim(),
                            'token': token,
                            '_wpnonce_field': eb_setup_wizard.sync_nonce,
                        },
                        success: function (response) {
                            if ('json_valid' == check) {
                                if (isValidJsonString(response) && response.data.data) {
                                    resolve(true);
                                }
                                resolve(false);
                            }
                            if (isValidJsonString(response) && typeof response == "string") {
                                response = JSON.parse(response);
                            }
                            if (response.data.correct) {
                                if ('server_blocking_check' == check) {
                                    if (response.data.validate_access.token_mismatch) {
                                        resolve(false);
                                    }
                                    if (!response.data.validate_access.is_authorized) {
                                        resolve(false);
                                    }
                                }
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (textStatus == 'parsererror') {
                                resolve(false);
                            }
                        }
                    });
                });
            }

            function isValidJsonString(str) {
                if (typeof str == "string") {
                    try {
                        JSON.parse(str);
                    } catch (e) {
                        return false;
                    }
                    return true;
                } else {
                    return true;
                }
            }

            $(document).on('click', '.auto_fix_issue.eb_json_valid_fix', function () {
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_json_valid_fix',
                    },
                    success: function (response) {
                        if (isValidJsonString(response)) {
                            jQuery('.eb_json_valid_fix + .autofix_custom_message').html(eb_setup_wizard.turn_off_debug_log);
                            jQuery('.eb_json_valid_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        jQuery('.eb_json_valid_fix + .autofix_custom_message').text(eb_setup_wizard.contact_support);
                        jQuery('.eb_json_valid_fix + .autofix_custom_message').slideDown();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (textStatus == 'parsererror') {
                            jQuery('.eb_json_valid_fix + .autofix_custom_message').text(eb_setup_wizard.contact_support);
                            jQuery('.eb_json_valid_fix + .autofix_custom_message').slideDown();
                        }
                    }
                });
            });
            $(document).on('click', '.auto_fix_issue.eb_token_validation_fix', function () {
                var url = $('#eb_setup_test_conn_mdl_url').val();
                var token = $('#eb_setup_test_conn_token').val();
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_token_validation_fix',
                        'url': url.trim(),
                        'token': token,
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                    },
                    success: function (response) {
                        if (isValidJsonString(response) && typeof response == "string") {
                            response = JSON.parse(response);
                        }
                        jQuery('.eb_token_validation_fix + .autofix_custom_message').text(eb_setup_wizard.please_refresh);
                        jQuery('.eb_token_validation_fix + .autofix_custom_message').slideDown();
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
            });

            $(document).on('click', '.auto_fix_issue.eb_server_blocking_check_fix', function () {
                var url = $('#eb_setup_test_conn_mdl_url').val();
                var token = $('#eb_setup_test_conn_token').val();
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_server_blocking_check',
                        'url': url.trim(),
                        'token': token,
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                    },
                    success: function (response) {
                        if (!response.data.correct) {
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').text(eb_setup_wizard.contact_hosting);
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').slideDown();
                        }
                        if (response.data.validate_access.token_mismatch) {
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').text(eb_setup_wizard.token_mismatch);
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').slideDown();
                        }
                        if (!response.data.validate_access.is_authorized) {
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').text(eb_setup_wizard.not_authorized);
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').slideDown();
                        }
                        if (response.data.validate_access.length == 0) {
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').text(eb_setup_wizard.check_mdl_config);
                            jQuery('.eb_server_blocking_check_fix + .autofix_custom_message').slideDown();
                        }
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
                return;
            });

            $(document).on('click', '.auto_fix_issue.eb_get_endpoint_fix', function () {
                jQuery('.eb_get_endpoint_fix + .autofix_custom_message').text(eb_setup_wizard.contact_support_get);
                jQuery('.eb_get_endpoint_fix + .autofix_custom_message').slideDown();
                return;
            });

            $(document).on('click', '.auto_fix_issue.eb_post_endpoint_fix', function () {
                jQuery('.eb_post_endpoint_fix + .autofix_custom_message').text(eb_setup_wizard.contact_support_post);
                jQuery('.eb_post_endpoint_fix + .autofix_custom_message').slideDown();
                return;
            });

            $(document).on('click', '.auto_fix_issue.eb_permalink_setting_fix', function () {
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_permalink_setting_fix',
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                    },
                    success: function (response) {
                        if (isValidJsonString(response) && typeof response == "string") {
                            response = JSON.parse(response);
                        }
                        if (response.data.wp_version_issue) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.wp_version_issue);
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.rest_disable_issue) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.rest_disable_issue);
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.permalink_setting_issue) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').html("<span>" + eb_setup_wizard.permalink_setting_issue + "</span>");
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.htaccess_file_missing && response.data.autofix_possible) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').html("<span>" + eb_setup_wizard.htaccess_file_missing + "</span><span class='eb_htaccess_create auto_fix_issue'> Fix Now </span>");
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.htaccess_rule_missing && response.data.autofix_possible) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').html("<span>" + eb_setup_wizard.htaccess_rule_missing + "</span><span class='eb_htaccess_create auto_fix_issue'> Fix Now </span>");
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.htaccess_file_missing) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.htaccess_rule_instructions);
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        if (response.data.htaccess_rule_missing) {
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.htaccess_rule_instructions);
                            jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                            return;
                        }
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.contact_support_misc);
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
                return;
            });

            $(document).on('click', '.auto_fix_issue.eb_permalink_setting_fix_save', function () {
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_permalink_setting_fix_save',
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                    },
                    success: function (response) {
                        if (isValidJsonString(response) && typeof response == "string") {
                            response = JSON.parse(response);
                        }
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.please_refresh);
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
                return;
            });

            $(document).on('click', '.auto_fix_issue.eb_htaccess_create', function () {
                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    data: {
                        'action': 'eb_htaccess_create',
                        '_wpnonce_field': eb_setup_wizard.sync_nonce,
                    },
                    success: function (response) {
                        if (isValidJsonString(response) && typeof response == "string") {
                            response = JSON.parse(response);
                        }
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').text(eb_setup_wizard.please_refresh);
                        jQuery('.eb_permalink_setting_fix + .autofix_custom_message').slideDown();
                        return;
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                    }
                });
                return;
            });

            // MaNAGE LICENSE
            $(document).on('click', '.eb_setup_license_install_plugins', function(event){
                var extensions = {};

                $('.eb_setup_license_inp').each(function() {
                    extensions[$(this).data('action')] = $(this).val().trim();
                });

                var license_key = $('.eb_setup_edwiser_bridge_pro_license').val().trim();
                if ( '' == license_key ) {
                    // add error message
                    $('.eb_setup_edwiser_bridge_pro_license_msg').html('<span class="eb_license_error">' + eb_setup_wizard.msg_empty_license_key + '</span>');
                }

                // check if license is valid
                if( $('.eb_license_error').length > 0){
                    return;
                }


                installPlugin( extensions, 0 );

            });

            // license key validation
            $(document).on('keyup', '.eb_setup_license_inp', function(){
                var key = $(this).val();

                if ( '' != key ) {
                    var action = $(this).data('action');

                    $(".eb_setup_" + action + "_license_msg").html('<span class="eb_license_process"><span class="eb_license_process_anim"></span>Validating licanse key</span>');

                    $.ajax({
                        method: "post",
                        url: eb_setup_wizard.ajax_url,
                        dataType: "json",
                        data: {
                            'action': 'eb_setup_validate_license',
                            'license_key': key,
                            'license_action': action,
                            '_wpnonce_field': eb_setup_wizard.nonce,
                        },
                        success: function (response) {

                            //prepare response for user
                            if (response.status == 'success') {
                                $(".eb_setup_" + action + "_license_msg").html('<span class="eb_license_success">' + response.message + '</span>');
                                $('.eb_setup_license_install_plugins').removeClass('disabled');
                            } else {
                                $('.text_install').show();
                                $(".eb_setup_" + action + "_license_msg").html('<span class="eb_license_error">' + response.message + '</span>');
                                $('.eb_setup_license_install_plugins').addClass('disabled');
                            }

                            $("#eb-lading-parent").hide();

                        }
                    });
                }

            });

            // install plugin
            function installPlugin(extensions, key) {
                var extension = {};
                // $("#eb-lading-parent").show();

                extension[Object.keys(extensions)[key]] = Object.values(extensions)[key];
                var ext_slug = Object.keys(extensions)[key];
                var license = $(".eb_setup_" + ext_slug + "_license").val();


                if ( '' != license ) {

                    $(".eb_setup_" + ext_slug + "_license_msg").html('<span class="eb_license_process"><span class="eb_license_process_anim"></span>Installation in process</span>');
                    
                    $.ajax({
                        method: "post",
                        url: eb_setup_wizard.ajax_url,
                        dataType: "json",
                        data: {
                            'action': 'eb_setup_manage_license',
                            // 'data': url.trim(),
                            'license_data': JSON.stringify(extension),
                            '_wpnonce_field': eb_setup_wizard.nonce,
                        },
                        success: function (response) {

                            //prepare response for user
                            if (response.success == 1) {

                                $.each(response.data, function(slug, value) {
                                    if(value.dependency){
                                        key--;
                                    } else {
                                        if (value.message){
                                            $(".eb_setup_" + slug + "_license_msg").html('<span class="eb_license_error"><span class="dashicons dashicons-no"></span>' + value.message + '</span>');
                                        } else {
                                            var msg = '';
                                            msg = value.install + '<br>' + value.activate;

                                            $(".eb_setup_" + slug + "_license_msg").html( msg );
                                        }
                                        //remove install plugin and text from bottom of page
                                        if(key == Object.keys(extensions).length - 1 && $('.eb_license_error').length == 0){
                                            $('.eb_setup_license_install_plugins').hide();
                                            $('.text_install').hide();
                                            $('.eb_setup_user_sync_btn_wrap span b').hide();
                                        }
                                        //$(".eb_setup_" + slug + "_license_msg").html( msg );
                                    }
                                });
                            } else {
                                $(".eb_setup_" + ext_slug + "_license_msg").html('<span class="eb_lic_status">Something went wrong</span>');
                            }

                            $("#eb-lading-parent").hide();

                            if(key < Object.keys(extensions).length - 1){
                                installPlugin(extensions, key + 1);
                            } else if($('.eb_license_error').length == 0) {
                                $('.ebs_license_install_plugins_cont').css('display', 'initial');
                            }
                        }
                    });
                } else {
                    installPlugin(extensions, key + 1);
                }

            }

            // Function for license activation

            /**
             * creates ajax request to initiate test connection request
             * display a response to user on process completion
             */
            // $('#eb_setup_verify_sso_roken_btn').click(function () {
            $(document).on( 'click', '.eb_setup_verify_sso_roken_btn', function(){
                $("#eb-lading-parent").show();

                //get selected options
                $('.response-box').empty(); // empty the response
                var url = $('#eb_url').val();
                var token = $('#eb_access_token').val();
                var $this = $(this);

                //display loading animation
                $('.load-response').show();

                $.ajax({
                    method: "post",
                    url: eb_setup_wizard.ajax_url,
                    dataType: "json",
                    data: {
                        'action': 'ebsso_verify_key',
                        'url': url,
                        'nonce': eb_setup_wizard.sso_nonce,
                        'wp_key': jQuery('#eb_setup_pro_sso_key').val()
                    },
                    success: function (response) {
                        $('.load-response').hide();
                        if ( response.success === true ) {
                            $('.eb_setup_sso_response').html(response.data);
                            $('.eb_setup_sso_response').addClass('eb_setup_settings_success_msg');
                            var parent = $this.parent();
                            var cont_btn = parent.children('.eb_setup_save_and_continue');
                            cont_btn.css('display', 'initial');
                            $this.css('display', 'none');
                        } else {
                            $('.eb_setup_sso_response').html(response.data);
                            $('.eb_setup_sso_response').addClass('eb_setup_settings_error_msg');
                        }

                        $("#eb-lading-parent").hide();
                    }
                });
            });

            // $('.eb_setup_upload_btn').change(function(){
            $(document).on( 'click', '.eb_setup_upload_btn', function(){
                $('.eb_setup_test_connection_btn').removeClass('disabled');
                $('.eb_setup_test_connection_btn').prop("disabled", false);
                $('#eb_setup_test_conn_mdl_url').val($('.eb_setup_test_conne_url').val());
                $('#eb_setup_test_conn_token').val($('.eb_setup_test_conne_token').val());
                $('#eb_setup_test_conn_lang_code').val($('.eb_setup_test_conne_lang').val());
                $('.eb_setup_test_conn_seprator_wrap').css('display', 'none');
                $('.eb_setup_test_conn_text').css('display', 'block');
                $('.eb_setup_test_conn_h2').css('display', 'none');
            });

            // function onChange(event) {
            $('.eb_setup_file_btn').change(function(event){
            // $(document).on( 'change', '.eb_setup_file_btn', function(){


                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(event.target.files[0]);
            });
        
            function onReaderLoad(event){
                console.log(event.target.result);
                var obj = JSON.parse(event.target.result);
                $('.eb_setup_test_conne_url').val(obj.url);
                $('.eb_setup_test_conne_token').val(obj.token);
                $('.eb_setup_test_conne_lang').val(obj.lang_code);
            }
            
            $('input[name="eb_setup_name"]').click(function() {
                if($(this).val() == 'eb_pro_setup') {
                    $('.eb-admin-pro-popup-setup-wizard').css('display', 'block');
                }
                $('#eb_setup_free_initialize').removeClass('disabled');
                $('#eb_setup_free_initialize').removeAttr("disabled");
            });

            
            // $("#eb_setup_test_conn_mdl_url").change(function () {
            $(document).on( 'change', '#eb_setup_test_conn_mdl_url', function(){

                if($(this).val() == "") {
                    // If text is empty,
                    $('.eb_setup_test_connection_btn').addClass('disabled');
                    $('.eb_setup_test_connection_btn').attr("disabled", "disabled");
                    
                } else {
                    if ( '' != $('#eb_setup_test_conn_token').val() && '' != $('#eb_setup_test_conn_lang_code').val() ) {
                        $('.eb_setup_test_connection_btn').removeClass('disabled');
                        $('.eb_setup_test_connection_btn').removeAttr("disabled");
                    }
                }
            });

            // $("#eb_setup_test_conn_token").change(function () {
            $(document).on( 'change', '#eb_setup_test_conn_token', function(){

                if($(this).val() == "") {
                    // If text is empty,
                    $('.eb_setup_test_connection_btn').addClass('disabled');
                    $('.eb_setup_test_connection_btn').attr("disabled", "disabled");
                    
                } else {
                    if ( '' != $('#eb_setup_test_conn_mdl_url').val() && '' != $('#eb_setup_test_conn_lang_code').val() ) {
                        $('.eb_setup_test_connection_btn').removeClass('disabled');
                        $('.eb_setup_test_connection_btn').removeAttr("disabled");
                    }
                }
            });

            // $("#eb_setup_test_conn_lang_code").change(function () {
            $(document).on( 'change', '#eb_setup_test_conn_lang_code', function(){

                if($(this).val() == "") {
                    // If text is empty,
                    $('.eb_setup_test_connection_btn').addClass('disabled');
                    $('.eb_setup_test_connection_btn').attr("disabled", "disabled");
                    
                } else {
                    if ( '' != $('#eb_setup_test_conn_mdl_url').val() && '' != $('#eb_setup_test_conn_token').val() ) {
                        $('.eb_setup_test_connection_btn').removeClass('disabled');
                        $('.eb_setup_test_connection_btn').removeAttr("disabled");
                    }
                }
            });




            $(document).on( 'change', '.eb_setup_file_btn', function(){
                if( jQuery(".eb_setup_file_btn").get(0).files.length == 0 ){
                    $('.eb_setup_upload_btn').addClass('disabled');
                    $('.eb_setup_upload_btn').attr('disabled', true);
                } else {
                    $('.eb_setup_upload_btn').removeClass('disabled');
                    $('.eb_setup_upload_btn').attr('disabled', false);
                }
            });


    });




})(jQuery);
