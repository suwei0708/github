(function($) {
$(function() {
    // 预览图片
    $('#upload-wrap').on('click', '.j-preview-btn', function() {
        if(typeof($(this).parents('.upload-item').find('.img').attr('src')) != 'undefined') {
            $('#preview-model').show();
        }
        else {
            $(this).parents('.upload-item').find('.btn-preview input').click();
        }
    });

    // 编辑预览图
    $('#upload-wrap').on('click', '.btn-edit', function() {
        $('#preview-model').show();
    });

    // 收起展开
    $('#upload-wrap').on('click', '.item-handle', function() {
        var $item = $(this).parents('.upload-item');
        if($item.hasClass('upload-open')) {
            $item.removeClass('upload-open');
        }
        else {
            $item.addClass('upload-open');
        }
    });

    // 删除上传弹窗
    $('#upload-wrap').on('click', '.item-close', function() {
        var _this = $(this);
        confirmMsg('确认删除当前上传文件吗?', '文件删除后将无法恢复', function() {
            _this.parents('.upload-item').hide();
        })
    });

    // 下一步
    $('#upload-wrap').on('click', '.j-step-next', function() {
        if(!$(this).hasClass('disable')) {
            $(this).parents('.upload-item').removeClass('upload-step1').addClass('upload-step2').addClass('upload-open');
            $(this).parents('.upload-item').find('.tag-i').html('2');
            $(this).parents('.upload-item').find('.step-intro').removeClass('cur').eq(1).addClass('cur');
        }
    });

    // 第三步提交
    $('#upload-wrap').on('click', '.submit-btn', function() {
        var $item = $(this).parents('.upload-item');
        $item.removeClass('upload-open').removeClass('upload-step2').addClass('upload-step3');
        $item.find('.tag-i').html('3');
        $item.find('.step-intro').removeClass('cur').eq(2).addClass('cur');
        setTimeout(function() {
            $item.remove();
        }, 3000);
    });

    // 第二步修改预览图
    $('#upload-wrap').on('click', '.image-preview', function() {
        $('#preview-model').show();
    });

    // 分类弹出框
    $('#upload-wrap').on('click', '.classify-select', function() {
        var dom = $(this).parents('.upload-item').find('.select-drop')
        dom.find('.drop-main li').find('.list-wrap').hide();
        dom.show().find('.drop-main li').removeClass('cur').eq(0).addClass('cur').find('.list-wrap').show();
        return false;
    });

    // 分类input不聚焦
    $('#upload-wrap').on('focus', '.classify-input', function() {
        $(this).blur();
        return false;
    });

    // 分类切换
    $('#upload-wrap').on('click', '.main-list', function() {
        if($(this).index() < $(this).parents().children('cur').index()) {
            $(this).addClass('cur').siblings().removeClass('cur').find('.list-wrap').hide();
            $(this).find('.list-wrap').show();
            return false;
        }

    });
    $('#upload-wrap').on('click', '.main-list dd', function() {
        $(this).parents('.main-list').next().addClass('cur').siblings().removeClass('cur').find('.list-wrap').hide();
        $(this).parents('.main-list').next().find('.list-wrap').show();
        return false;
    });

    // 关闭分类
    $('body').on('click', function() {
        $('.select-drop').hide();
    });

    // // 实例化
    // uploader = WebUploader.create({
    //     pick: '#uploadFile-button',
    //     dnd: '#dndArea',
    //     swf: 'Uploader.swf',
    //     chunked: false,
    //     chunkSize: 512 * 1024,
    //     server: '/test/upload.html',
    //     compress: false,
    //     auto: true,

    //     // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
    //     disableGlobalDnd: true,
    //     fileNumLimit: 300,
    //     fileSizeLimit: 200 * 1024 * 1024,    // 200 M
    //     fileSingleSizeLimit: 50 * 1024 * 1024    // 50 M
    // });

    // // 加入上传队列之前
    // uploader.on('beforeFileQueued', function(file) {
    //     // 判断上传文件是否大于20G
    //     if(file.size > 1024 * 1024 * 1024 * 20) {
    //         alert('文件过大')
    //         return false;
    //     }
    // });
    // // 加入上传队列
    // uploader.on('fileQueued', function(file) {
    //     var str = `<div class="upload-item" data-step="1" id="` + file.id + `">
    //                     <div class="item-close">×</div>
    //                     <div class="item-tag">` + (+file.id.replace('WU_FILE_', '') + 1) + `</div>
    //                     <div class="item-title">设置预览图/视频 <em class="tag-em">(<i class="tag-i">1</i>/3)</em></div>
    //                     <!-- 步骤 start -->
    //                     <div class="item-step">
    //                         <div class="step-intro action">
    //                             <p class="step-num">1</p>
    //                             <p class="step-text">设置预览图/视频</p>
    //                         </div>
    //                         <div class="step-intro">
    //                             <p class="step-num">2 </p>
    //                             <p class="step-text">完善信息</p>
    //                         </div>
    //                         <div class="step-intro">
    //                             <p class="step-num">3</p>
    //                             <p class="step-text">完成上传</p>
    //                         </div>
    //                     </div>
    //                     <!-- 步骤 end -->
    //                     <!-- 第一步 start -->
    //                     <div class="item-upload" style="display: block;">
    //                         <div class="upload-preview">
    //                             <img src="" width="72" height="96" alt="" class="img">
    //                             <a href="javascript:;" class="upload-btn btn-edit"><i class="icon icon-bianji"></i>编辑</a>
    //                             <a href="javascript:;" class="upload-btn btn-preview"><span>上传预览图</span></a>
    //                         </div>
    //                         <div class="upload-info">
    //                             <p class="info-name"> ` + file.name + ` </p>
    //                             <p class="info-des">大小: ` + WebUploader.formatSize( file.size ) + `</p>
    //                         </div>
    //                         <div class="upload-progress">
    //                             <img src="../images/success.png" class="icon-success" width="70" height="70">
    //                             <img src="../images/waiting.png" class="icon-waiting" width="70" height="70">
    //                             <img src="../images/warning.png" class="icon-warning" width="70" height="70">
    //                             <div class="progress-text"></div>
    //                         </div>
    //                     </div>
    //                     <!-- 第一步 end -->
    //                     <!-- 第二步 start -->
    //                     <form class="file-info"></form>
    //                     <!-- 第二步 end -->
    //                     <!-- 第三步 start -->
    //                     <div class="file-success"></div>
    //                     <!-- 第三步 end -->
    //                     <div class="upload-btn-right">
    //                         <p class="mk-btn btn-green j-preview-btn">
    //                             <a href="javascript:;">预览图</a>
    //                         </p>
    //                         <p class="mk-btn btn-green-linear j-step-next disable">
    //                             <a href="javascript:;">下一步</a>
    //                         </p>
    //                     </div>
    //                     <div class="item-handle">展开</div>
    //                 </div>`;
    //     $('#upload-wrap').append(str);
    //     if($('.upload-item').length == 1 ) {
    //         $('#upload-wrap').find('.upload-item').eq(0).find('.item-handle').html('收起');
    //     }


    //     // 模拟上传成功事件
    //     $li = $( '#'+file.id );
    //     $percent = $li.find('.upload-progress');
    //     $img = $li.find('.img');
    //     // uploader.reset();// 如果出现问题，一定要加上这一句
    //     $percent.find('.progress-text').html('上传成功');
    //     if(typeof($li.find('.img').attr('src')) != 'undefined') {
    //         $li.find('.j-step-next').removeClass('disable');
    //     }
    //     // 创建预览图
    //     uploader.makeThumb(file, function(error, src) {
    //         if (error) {
    //             // $img.replaceWith('<span>此文件无法预览</span>');
    //             $li.find('.btn-preview').css({'display': 'block'});

    //             // 实例化
    //             var upload  = WebUploader.create({
    //                 pick: $li.find('.btn-preview'),
    //                 swf: 'Uploader.swf',
    //                 chunked: false,
    //                 chunkSize: 512 * 1024,
    //                 server: '/test/upload.html',
    //                 compress: false,
    //                 auto: true,
    //                 accept: {
    //                     title: 'Images',
    //                     extensions: 'jpg, jpeg',
    //                     mimeTypes: 'image/*'
    //                 }
    //             });
    //             upload.on('uploadSuccess', function(file, response) {
    //                 // uploader.reset();// 如果出现问题，一定要加上这一句
    //                 uploader.makeThumb(file, function(error, src) {
    //                     if (error) {
    //                         alert('请上传正确图片');
    //                         return;
    //                     }
    //                     btnPreview.find('.img').prop('src', src);
    //                     btnPreview.find('.btn-preview').hide();
    //                     btnPreview.find('.btn-edit').show();
    //                     if(btnPreview.find('.img').attr('src') != 'undefind') {
    //                         $li.find('.j-step-next').removeClass('disable');
    //                     }
    //                 }, 72, 96);
    //             });

    //             return;
    //         }
    //         $( '#'+file.id ).find('.img').prop('src', src);
    //         $( '#'+file.id ).find('.btn-edit').show();
    //     }, 72, 96);
    // });

    // // 文件上传过程中创建进度条实时显示。
    // uploader.on( 'uploadProgress', function( file, percentage ) {
    //     $li = $( '#'+file.id );
    //     $percent = $li.find('.upload-progress');
    //     $percent.find('img').hide();
    //     $percent.find('.icon-waiting').show();
    //     $percent.find('.progress-text').html( parseInt(percentage * 100) + '%' );
    //     if(percentage == 1) {
    //         $percent.find('.icon-waiting').hide();
    //         $percent.find('.icon-success').show();
    //         $percent.find('.progress-text').html('上传成功');
    //     }
    // });

    // // 上传成功
    // uploader.on('uploadSuccess', function(file, response) {
    //     // $li = $( '#'+file.id );
    //     // $percent = $li.find('.upload-progress');
    //     // $img = $li.find('.img');
    //     // // uploader.reset();// 如果出现问题，一定要加上这一句
    //     // $percent.find('.progress-text').html('上传成功');
    //     // if(typeof($li.find('.img').attr('src')) != 'undefined') {
    //     //     $li.find('.j-step-next').removeClass('disable');
    //     // }
    //     // // 创建预览图
    //     // uploader.makeThumb(file, function(error, src) {
    //     //     if (error) {
    //     //         // $img.replaceWith('<span>此文件无法预览</span>');
    //     //         $li.find('.btn-preview').css({'display': 'block'});

    //     //         // 实例化
    //     //         var upload  = WebUploader.create({
    //     //             pick: $li.find('.btn-preview'),
    //     //             swf: 'Uploader.swf',
    //     //             chunked: false,
    //     //             chunkSize: 512 * 1024,
    //     //             server: '/test/upload.html',
    //     //             compress: false,
    //     //             auto: true,
    //     //             accept: {
    //     //                 title: 'Images',
    //     //                 extensions: 'jpg, jpeg',
    //     //                 mimeTypes: 'image/*'
    //     //             }
    //     //         });
    //     //         upload.on('uploadSuccess', function(file, response) {
    //     //             // uploader.reset();// 如果出现问题，一定要加上这一句
    //     //             uploader.makeThumb(file, function(error, src) {
    //     //                 if (error) {
    //     //                     alert('请上传正确图片');
    //     //                     return;
    //     //                 }
    //     //                 btnPreview.find('.img').prop('src', src);
    //     //                 btnPreview.find('.btn-preview').hide();
    //     //                 btnPreview.find('.btn-edit').show();
    //     //                 if(btnPreview.find('.img').attr('src') != 'undefind') {
    //     //                     $li.find('.j-step-next').removeClass('disable');
    //     //                 }
    //     //             }, 72, 96);
    //     //         });

    //     //         return;
    //     //     }
    //     //     $( '#'+file.id ).find('.img').prop('src', src);
    //     //     $( '#'+file.id ).find('.btn-edit').show();
    //     // }, 72, 96);
    // });
    // // 上传失败
    // uploader.on('uploadError', function(file, response) {
    //     // $li = $( '#'+file.id );
    //     // $percent = $li.find('.upload-progress');
    //     // $percent.find('img').hide();
    //     // $percent.find('.icon-warning').show();
    //     // // uploader.reset();// 如果出现问题，一定要加上这一句
    //     // $percent.find('.progress-text').html('上传失败');
    // });

});
})(jQuery);